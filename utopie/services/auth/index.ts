import { AuthenticateParams, AuthType, SignInParams, SignUpParams } from '@/services/auth/types';
import { comparePasswords, encryptPassword, generateToken, verifyToken } from '@/util/auth';
import { toUserDTO, toUserTokenDTO } from '@/dtos/user';
import { UserTokenDTO } from '@/dtos/user/types';

import APIError, { Errors } from '@/shared/APIError';

import * as userRepository from '@/repositories/user';

export async function authenticate({ token }: AuthenticateParams): Promise<AuthType> {
	const payload = verifyToken<UserTokenDTO>(token);

	if (!payload) {
		throw new APIError(Errors.UNAUTHORIZED, { message: 'Provided token is invalid!' });
	}

	const user = await userRepository.findOne({ id: payload.id });

	if (!user) {
		throw new APIError(Errors.INTERNAL_SERVER_ERROR);
	}

	return {
		user: toUserDTO(user),
		token
	};
}

export async function signIn({ name, password }: SignInParams): Promise<AuthType> {
	const user = await userRepository.findOne({ name });

	if (!user) {
		throw new APIError(Errors.UNAUTHORIZED, { message: 'Incorrect email or password!' });
	}

	const match = await comparePasswords(password, user.password);

	if (!match) {
		throw new APIError(Errors.UNAUTHORIZED, { message: 'Incorrect email or password!' });
	}

	const token = generateToken(toUserTokenDTO(user));

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

	const token = generateToken(toUserTokenDTO(user));

	return {
		user: toUserDTO(user),
		token
	};
}
