import { AuthType, SignInParams, SignUpParams } from '@/services/auth/types';
import { comparePasswords, encryptPassword, generateToken } from '@/util/auth';

import * as userRepository from '@/repositories/user';

export async function signIn({ name, password }: SignInParams): Promise<AuthType> {
	const user = await userRepository.findOne({ name }, true);

	if (!user) {
		throw new Error('Incorrect email or password!');
	}

	const match = await comparePasswords(password, user.password);

	if (!match) {
		throw new Error('Incorrect email or password!');
	}

	const token = generateToken(user.id);

	return { user, token };
}

export async function signUp({ name, email, password }: SignUpParams): Promise<AuthType> {
	const userByName = await userRepository.findOne({ name });

	if (userByName) {
		throw new Error('User with this name already exists!');
	}

	const userByEmail = await userRepository.findOne({ email });

	if (userByEmail) {
		throw new Error('User with this email already exists!');
	}

	const encryptedPassword = await encryptPassword(password);

	const user = await userRepository.create({ name, email, password: encryptedPassword });

	const token = generateToken(user.id);

	return { user, token };
}
