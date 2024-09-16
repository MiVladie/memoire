import { SignInParams, SignInType } from '@/services/auth/types';
import { comparePasswords, generateToken } from '@/util/auth';

import * as userRepository from '@/repositories/user';

export async function signIn({ name, password }: SignInParams): Promise<SignInType> {
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
