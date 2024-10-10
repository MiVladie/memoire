import {
	GetSoundCloudUserParams,
	GetSoundCloudPlaylistsParams,
	GetSoundCloudPlaylistsType,
	GetSoundCloudUserType
} from '@/services/soundcloud/types';
import { fromSoundCloudPlaylistsDTO } from '@/dtos/playlist';
import { CreatePlaylistDTO } from '@/dtos/playlist/types';
import { SoundCloudPlaylistType } from '@/interfaces/soundcloud';
import { Platform } from '@/constants';

import APIError, { Errors } from '@/shared/APIError';

import * as API from '@/api';

export async function findUser({ name }: GetSoundCloudUserParams): Promise<GetSoundCloudUserType> {
	const { collection } = await API.SoundCloud.search({ query: name });

	const rawUser = collection.find((item) => item.permalink === name && item.kind === 'user');

	if (!rawUser) {
		throw new APIError(Errors.NOT_FOUND, { message: 'No users found!' });
	}

	const user = await API.SoundCloud.getUser(rawUser.id);

	return { user };
}

export async function getPlaylists({
	userId,
	soundcloudUserId
}: GetSoundCloudPlaylistsParams): Promise<GetSoundCloudPlaylistsType> {
	const { collection } = await API.SoundCloud.getPlaylists(soundcloudUserId);

	const customPlaylists: CreatePlaylistDTO[] = fromSoundCloudPlaylistsDTO(collection).map((p) => ({
		...p,
		type: SoundCloudPlaylistType.CUSTOM,
		userId
	}));

	const defaultPlaylists: CreatePlaylistDTO[] = [...Platform.SoundCloud.playlists].map((p) => ({
		...p,
		platformId: Platform.SoundCloud.id,
		userId
	}));

	return { playlists: [...defaultPlaylists, ...customPlaylists] };
}
