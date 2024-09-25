import { UpdateParams, UpdatePasswordParams, UpdateType } from './types';
import { comparePasswords, encryptPassword } from '@/util/auth';
import { toUserDTO } from '@/dtos/user';

import APIError, { Errors } from '@/shared/APIError';

import * as userRepository from '@/repositories/user';

export async function update(userId: number, { name }: UpdateParams): Promise<UpdateType> {
	const user = await userRepository.update(userId, { name });

	return {
		user: toUserDTO(user)
	};
}

export async function updatePassword(userId: number, params: UpdatePasswordParams): Promise<UpdateType> {
	const user = (await userRepository.findOne({ id: userId }))!;

	const match = await comparePasswords(params.password, user.password);

	if (!match) {
		throw new APIError(Errors.UNAUTHORIZED, { message: 'Incorrect password!' });
	}

	const encryptedPassword = await encryptPassword(params.newPassword);

	await userRepository.update(userId, { password: encryptedPassword });

	return {
		user: toUserDTO(user)
	};
}
