import {
	AddPlaylistsParams,
	AddPlaylistsType,
	AddSoundCloudPlaylistParams,
	AddSoundCloudPlaylistType,
	GetParams,
	GetSongsParams,
	GetSongsType,
	GetType,
	RemovePlaylistsParams,
	RemovePlaylistsType
} from './types';
import { SoundCloudPlaylistType } from '@/interfaces/soundcloud';
import { toPlaylistsDTO } from '@/dtos/playlist';
import { toSongsDTO } from '@/dtos/song';
import { Platform } from '@/constants';

import PlaylistJob from '@/jobs/playlist';

import APIError, { Errors } from '@/shared/APIError';

import * as soundCloudService from '@/services/soundcloud';

import * as playlistRepository from '@/repositories/playlist';
import * as songRepository from '@/repositories/song';
import * as userRepository from '@/repositories/user';

const PlaylistQueue = new PlaylistJob();

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
		songs: toSongsDTO(songs)
	};
}

export async function addPlaylists(params: AddPlaylistsParams): Promise<AddPlaylistsType> {
	for (let rawPlaylist of params.playlists) {
		const playlist = await playlistRepository.create(rawPlaylist);

		switch (playlist.platformId) {
			case Platform.SoundCloud.id:
				await PlaylistQueue.addSoundCloudPlaylist({
					playlistId: playlist.id,
					playlist: rawPlaylist
				} as AddSoundCloudPlaylistParams);
				break;

			default:
				throw new APIError(Errors.INTERNAL_SERVER_ERROR);
		}
	}
}

export async function addSoundCloudPlaylist(params: AddSoundCloudPlaylistParams): Promise<AddSoundCloudPlaylistType> {
	const user = await userRepository.findOne({ id: params.playlist.userId });

	let data;

	switch (params.playlist.type!) {
		case SoundCloudPlaylistType.REPOSTS:
			data = await soundCloudService.getReposts({ soundcloudUserId: user!.soundcloudId! });
			break;

		case SoundCloudPlaylistType.LIKES:
			data = await soundCloudService.getLikes({ soundcloudUserId: user!.soundcloudId! });
			break;

		case SoundCloudPlaylistType.CUSTOM:
			data = await soundCloudService.getPlaylistSongs({ soundcloudPlaylistId: params.playlist.soundcloudId });
			break;

		default:
			throw new APIError(Errors.INTERNAL_SERVER_ERROR);
	}

	let order = await playlistRepository.getOrder(params.playlistId);

	const reversedList = data.songs.reverse();

	for (let track of reversedList) {
		let song = await songRepository.findOne({ soundcloudTrackId: track.soundcloudId });

		if (!song) {
			song = await songRepository.create(track);
		}

		order += 1;

		await playlistRepository.addSong(params.playlistId, song.id, order);
	}
}

export async function removePlaylists(params: RemovePlaylistsParams): Promise<RemovePlaylistsType> {
	await playlistRepository.remove(params);
}
