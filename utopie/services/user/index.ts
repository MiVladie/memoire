import { UpdateParams, UpdatePasswordParams, AddSoundCloudParams, UpdateType } from './types';
import { comparePasswords, encryptPassword } from '@/util/auth';
import { PLATFORMS } from '@/constants/db';
import { deleteFile } from '@/util/file';
import { toUserDTO } from '@/dtos/user';
import { File } from '@/constants';

import APIError, { Errors } from '@/shared/APIError';
import path from 'path';

import * as soundCloudService from '@/services/soundcloud';
import * as playlistService from '@/services/playlist';

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

	const user = await userRepository.update(userId, {
		name: params.name,
		image: params.image,
		soundcloudId: params.soundcloudId
	});

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

export async function linkSoundCloud(userId: number, params: AddSoundCloudParams): Promise<UpdateType> {
	const soundCloudUser = await soundCloudService.findUser({ name: params.soundcloudName });

	const user = await userRepository.update(userId, { soundcloudId: soundCloudUser.user.id });

	const { playlists } = await soundCloudService.getPlaylists({
		userId: user.id,
		soundcloudUserId: soundCloudUser.user.id
	});

	await playlistService.addPlaylists({ playlists });

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

export async function unlinkSoundCloud(userId: number): Promise<UpdateType> {
	const user = await userRepository.update(userId, { soundcloudId: null });

	await playlistService.removePlaylists({ userId, platformId: PLATFORMS.SoundCloud.id });

	return {
		user: toUserDTO(user)
	};
}
