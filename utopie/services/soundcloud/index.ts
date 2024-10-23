import {
	GetSoundCloudUserParams,
	GetSoundCloudPlaylistsParams,
	GetSoundCloudPlaylistsType,
	GetSoundCloudUserType,
	GetSoundCloudRepostsParams,
	GetSoundCloudRepostsType,
	GetSoundCloudLikesParams,
	GetSoundCloudLikesType,
	GetSoundCloudPlaylistSongsParams,
	GetSoundCloudPlaylistSongsType,
	GetSoundCloudTrackParams,
	GetSoundCloudTrackType,
	GetSoundCloudTracksParams,
	GetSoundCloudTracksType
} from '@/services/soundcloud/types';
import { CreatePlaylistDTO } from '@/dtos/playlist/types';
import { CreateSongDTO } from '@/dtos/song/types';
import { fromSoundCloudPlaylistsDTO } from '@/dtos/playlist';
import { fromSoundCloudCollectionDTO, fromSoundCloudTrackDTO, fromSoundCloudTracksDTO } from '@/dtos/song';
import { SoundCloudPlaylistType } from '@/interfaces/soundcloud';
import { getQueryParam } from '@/util/api';
import { intoChunks } from '@/util/optimization';
import { SoundCloud } from '@/constants/api';
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

export async function getReposts({ soundcloudUserId }: GetSoundCloudRepostsParams): Promise<GetSoundCloudRepostsType> {
	const songs: CreateSongDTO[] = [];

	let offset = '';

	while (true) {
		const { collection, next_href } = await API.SoundCloud.getReposts(soundcloudUserId, {
			limit: SoundCloud.TRACK_LIMIT,
			offset
		});

		if (collection.length === 0) {
			break;
		}

		// Offsetting from the last song
		offset = getQueryParam(next_href, 'offset');

		// Inserting into songs
		songs.push(...fromSoundCloudCollectionDTO(collection));
	}

	return { songs };
}

export async function getLikes({ soundcloudUserId }: GetSoundCloudLikesParams): Promise<GetSoundCloudLikesType> {
	const songs: CreateSongDTO[] = [];

	let offset = '';

	while (true) {
		const { collection, next_href } = await API.SoundCloud.getLikes(soundcloudUserId, {
			limit: SoundCloud.TRACK_LIMIT,
			offset
		});

		if (collection.length === 0) {
			break;
		}

		// Offsetting from the last song
		offset = getQueryParam(next_href, 'offset');

		// Inserting into songs
		songs.push(...fromSoundCloudCollectionDTO(collection));
	}

	return { songs };
}

export async function getPlaylistSongs({
	soundcloudPlaylistId
}: GetSoundCloudPlaylistSongsParams): Promise<GetSoundCloudPlaylistSongsType> {
	const { tracks: shortTracks } = await API.SoundCloud.getPlaylist(soundcloudPlaylistId);

	const songs: CreateSongDTO[] = [];
	const chunks = intoChunks(shortTracks.map((t) => t.id));

	for (let chunk of chunks) {
		const tracks = await API.SoundCloud.getTracks(chunk);

		songs.push(...fromSoundCloudTracksDTO(tracks));
	}

	return { songs };
}

export async function getTrack({ id }: GetSoundCloudTrackParams): Promise<GetSoundCloudTrackType> {
	const track = await API.SoundCloud.getTrack(id);

	const song: CreateSongDTO = fromSoundCloudTrackDTO(track);

	const transcodingUrl = track.media.transcodings.find((t) => t.format.protocol === 'hls')!.url;

	const { url: media } = await API.SoundCloud.getMedia(transcodingUrl);

	return { song: { ...song, media } };
}

export async function getTracks({ ids }: GetSoundCloudTracksParams): Promise<GetSoundCloudTracksType> {
	const songs: CreateSongDTO[] = [];

	const tracks = await API.SoundCloud.getTracks(ids);

	songs.push(...fromSoundCloudTracksDTO(tracks));

	return { songs };
}
