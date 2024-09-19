import { AuthType, SignInParams, SignUpParams } from '@/services/auth/types';
import { comparePasswords, encryptPassword, generateToken } from '@/util/auth';
import { toUserDTO } from '@/dtos/user';

import APIError, { Errors } from '@/shared/APIError';

import * as userRepository from '@/repositories/user';

export async function signIn({ name, password }: SignInParams): Promise<AuthType> {
	const user = await userRepository.findOne({ name });

	if (!user) {
		throw new APIError(Errors.UNAUTHORIZED, { message: 'Incorrect email or password!' });
	}

	const match = await comparePasswords(password, user.password);

	if (!match) {
		throw new APIError(Errors.UNAUTHORIZED, { message: 'Incorrect email or password!' });
	}

	const token = generateToken(user.id);

	return {
		user: toUserDTO(user),
		token
	};
}

export async function signUp({ name, email, password }: SignUpParams): Promise<AuthType> {
	const userByName = await userRepository.findOne({ name });

	if (userByName) {
		throw new APIError(Errors.NAME_ALREADY_IN_USE);
	}

	const userByEmail = await userRepository.findOne({ email });

	if (userByEmail) {
		throw new APIError(Errors.EMAIL_ALREADY_TAKEN);
	}

	const encryptedPassword = await encryptPassword(password);

	const user = await userRepository.create({ name, email, password: encryptedPassword });

	const token = generateToken(user.id);

	return {
		user: toUserDTO(user),
		token
	};
}
