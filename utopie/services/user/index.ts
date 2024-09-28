import { UpdateParams, UpdatePasswordParams, UpdateType } from './types';
import { comparePasswords, encryptPassword } from '@/util/auth';
import { deleteFile } from '@/util/file';
import { toUserDTO } from '@/dtos/user';
import { File } from '@/constants';

import APIError, { Errors } from '@/shared/APIError';
import path from 'path';

import * as userRepository from '@/repositories/user';

export async function update(userId: number, params: UpdateParams): Promise<UpdateType> {
	if (params.name) {
		const userByName = await userRepository.findOne({ name: params.name });

		if (userByName) {
			throw new APIError(Errors.NAME_ALREADY_IN_USE);
		}

		const userByEmail = await userRepository.findOne({ email: params.name });

		if (userByEmail) {
			throw new APIError(Errors.NAME_ALREADY_IN_USE);
		}
	}

	const user = await userRepository.update(userId, params);

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

export async function deleteImage(userId: number): Promise<UpdateType> {
	const user = (await userRepository.findOne({ id: userId }))!;

	if (!user.image) {
		throw new APIError(Errors.NOT_FOUND, { message: 'Image does not exist!' });
	}

	deleteFile(path.join(File.PUBLIC_PATH, File.IMAGES_PATH, user.image));

	const updatedUser = (await userRepository.update(userId, { image: null }))!;

	return {
		user: toUserDTO(updatedUser)
	};
}
