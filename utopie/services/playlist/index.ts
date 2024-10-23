import {
	AddPlaylistsParams,
	AddPlaylistsType,
	PopulateSoundCloudPlaylistParams,
	PopulateSoundCloudPlaylistType,
	GetParams,
	GetSongsParams,
	GetSongsType,
	GetType,
	PopulatePlaylistParams,
	PopulatePlaylistType,
	RemovePlaylistsParams,
	RemovePlaylistsType
} from './types';
import { SoundCloudPlaylistType } from '@/interfaces/soundcloud';
import { toPlaylistsDTO } from '@/dtos/playlist';
import { objectsMatch } from '@/util/validation';
import { excludeKeys } from '@/util/optimization';
import { toSongsDTO } from '@/dtos/song';
import { Platform } from '@/constants';

import PlaylistJob from '@/jobs/playlist';

import APIError, { Errors } from '@/shared/APIError';

import * as soundCloudService from '@/services/soundcloud';

import * as playlistRepository from '@/repositories/playlist';
import * as songRepository from '@/repositories/song';
import * as userRepository from '@/repositories/user';
import { Song } from '@/interfaces/models';

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

	const songs = await playlistRepository.findSongs(
		{ id: params.playlistId, search: params.search, isPresent: params.isPresent },
		params.limit,
		params.cursor
	);

	return {
		songs: toSongsDTO(songs)
	};
}

export async function addPlaylists(params: AddPlaylistsParams): Promise<AddPlaylistsType> {
	for (let rawPlaylist of params.playlists) {
		const playlist = await playlistRepository.create(rawPlaylist);

		// Populate playlists now & on schedule
		await PlaylistQueue.populatePlaylist({ playlistId: playlist.id }, true);

		await PlaylistQueue.populatePlaylist({ playlistId: playlist.id });
	}
}

export async function populatePlaylist(params: PopulatePlaylistParams): Promise<PopulatePlaylistType> {
	const { playlistId } = params;

	const playlist = await playlistRepository.findOne({ id: playlistId });

	if (!playlist) {
		throw new APIError(Errors.INTERNAL_SERVER_ERROR);
	}

	switch (playlist.platformId) {
		case Platform.SoundCloud.id:
			await populateSoundCloudPlaylist({ playlist });
			break;

		default:
			throw new APIError(Errors.INTERNAL_SERVER_ERROR);
	}
}

export async function populateSoundCloudPlaylist({
	playlist
}: PopulateSoundCloudPlaylistParams): Promise<PopulateSoundCloudPlaylistType> {
	const user = await userRepository.findOne({ id: playlist.userId });

	let data;

	switch (playlist.soundcloudPlaylist!.type) {
		case SoundCloudPlaylistType.REPOSTS:
			data = await soundCloudService.getReposts({ soundcloudUserId: user!.soundcloudId! });
			break;

		case SoundCloudPlaylistType.LIKES:
			data = await soundCloudService.getLikes({ soundcloudUserId: user!.soundcloudId! });
			break;

		case SoundCloudPlaylistType.CUSTOM:
			data = await soundCloudService.getPlaylistSongs({
				soundcloudPlaylistId: playlist.soundcloudPlaylist!.soundcloudPlaylistId!
			});
			break;

		default:
			throw new APIError(Errors.INTERNAL_SERVER_ERROR);
	}

	// SoundCloud songs
	const soundCloudSongs = data.songs.reverse();

	// Playlist songs
	const playlistSongs = await playlistRepository.findSongs({ id: playlist.id });

	// Existing songs
	const existingSongs = playlistSongs.filter((p) =>
		soundCloudSongs.find((s) => s.soundcloudId! === p.soundcloudSong!.soundcloudTrackId)
	);

	// Update songs if any changed
	for (let exisingSong of existingSongs) {
		const matchingSoundCloudSong = soundCloudSongs.find(
			(s) => s.soundcloudId! === exisingSong.soundcloudSong?.soundcloudTrackId
		)!;

		if (!objectsMatch(exisingSong, matchingSoundCloudSong)) {
			await songRepository.update(
				exisingSong.id,
				excludeKeys(matchingSoundCloudSong, ['platformId', 'soundcloudId'])
			);
		}
	}

	// Missing songs
	const missingSongs = playlistSongs.filter(
		(p) => !soundCloudSongs.find((s) => s.soundcloudId! === p.soundcloudSong!.soundcloudTrackId && p.isPresent)
	);

	// New songs
	const newSongs = soundCloudSongs.filter(
		(s) => !playlistSongs.find((p) => p.soundcloudSong!.soundcloudTrackId === s.soundcloudId!)
	);

	let order = await playlistRepository.getOrder(playlist.id);

	for (let newSong of newSongs) {
		let song: Song = await songRepository.findOne({ soundcloudTrackId: newSong.soundcloudId });

		if (!song) {
			song = (await songRepository.create(newSong)) as Song;
		}

		order += 1;

		await playlistRepository.associateSong(playlist.id, song.id, order);
	}

	if (missingSongs.length > 0) {
		const missingSongIds = missingSongs.map((s) => s.soundcloudSong!.soundcloudTrackId);

		const existingMissingSongs = await soundCloudService.getTracks({ ids: missingSongIds });

		// Missing song can be either because: - user unliked/unreposted OR - song got deleted by author/SoundCloud
		for (let missingSong of missingSongs) {
			const userRemovedSong = existingMissingSongs.songs.find(
				(e) => e.soundcloudId! === missingSong.soundcloudSong!.soundcloudTrackId
			);

			if (userRemovedSong) {
				// unassociate songs from user's playlist
				await playlistRepository.unassociateSong(playlist.id, missingSong.id);
			} else {
				// mark song as not present
				await songRepository.update(missingSong.id, { isPresent: false });
			}
		}
	}
}

export async function removePlaylists(params: RemovePlaylistsParams): Promise<RemovePlaylistsType> {
	const playlists = await playlistRepository.findMany({ platformId: params.platformId, userId: params.userId });

	for (let playlist of playlists) {
		await PlaylistQueue.removePlaylist({ playlistId: playlist.id });
	}

	await playlistRepository.remove(params);
}
