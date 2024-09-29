import { GetParams, GetSongsParams, GetSongsType, GetType } from './types';
import { toPlaylistsDTO } from '@/dtos/playlist';
import { toSongsDTO } from '@/dtos/song';

import APIError, { Errors } from '@/shared/APIError';

import * as playlistRepository from '@/repositories/playlist';

export async function get(params: GetParams): Promise<GetType> {
	const playlists = await playlistRepository.findMany({
		userId: params.userId,
		platformId: params.platformId
	});

	return {
		playlists: toPlaylistsDTO(playlists)
	};
}

export async function getSongs(params: GetSongsParams): Promise<GetSongsType> {
	const playlist = await playlistRepository.findOne({ id: params.playlistId });

	if (!playlist) {
		throw new APIError(Errors.NOT_FOUND, { message: 'Request playlist does not exist!' });
	}

	const songs = await playlistRepository.findSongs({ id: params.playlistId });

	return {
		// @ts-ignore
		songs: toSongsDTO(songs)
	};
}
