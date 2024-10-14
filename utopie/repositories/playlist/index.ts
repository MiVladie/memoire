import { excludeKeys } from '@/util/optimization';
import { CreateParams, FindOneParams, FindManyParams, FindSongsParams, RemoveParams } from './types';
import { Playlist } from '@/interfaces/models';
import { Platform } from '@/constants';

import db from '@/config/db';

export function create(data: CreateParams) {
	const soundcloudData: any = {
		soundcloudPlaylist: {
			create: {
				type: data.type,
				soundcloudPlaylistId: data.soundcloudId
			}
		}
	};

	return db.playlist.create({
		data: {
			...excludeKeys(data, ['type', 'soundcloudId']),
			...(data.platformId === Platform.SoundCloud.id ? soundcloudData : {})
		},
		include: {
			soundcloudPlaylist: true
		}
	});
}

export function findOne(where: FindOneParams) {
	return db.playlist.findFirst({ where, include: { soundcloudPlaylist: true } }) as Promise<Playlist>;
}

export function findMany(where?: FindManyParams) {
	return db.playlist.findMany({ where, include: { soundcloudPlaylist: true } }) as Promise<Playlist[]>;
}

export async function findSongs(where: FindSongsParams, limit?: number, cursor?: number) {
	const pagination = cursor
		? {
				cursor: { playlistId_songId: { playlistId: where.id, songId: cursor! } },
				skip: 1
		  }
		: {};

	const { songs } = await db.playlist.findUniqueOrThrow({
		where,
		include: {
			songs: {
				include: { song: { include: { soundcloudSong: true } } },
				orderBy: { order: 'asc' },
				take: limit,
				...pagination
			}
		}
	});

	return songs.map((data) => data.song);
}

export async function associateSong(id: number, songId: number, order?: number) {
	if (order == undefined) {
		order = (await getOrder(id)) + 1;
	}

	return db.playlistsSongs.create({
		data: {
			playlistId: id,
			songId,
			order
		}
	});
}

export async function unassociateSong(id: number, songId: number) {
	return db.playlistsSongs.delete({
		where: {
			playlistId_songId: {
				playlistId: id,
				songId: songId
			}
		}
	});
}

export async function getOrder(id: number) {
	const lastRelation = await db.playlistsSongs.findFirst({
		where: { playlistId: id },
		orderBy: { order: 'desc' }
	});

	return lastRelation?.order ?? 0;
}

export async function remove(where: RemoveParams) {
	await db.playlist.deleteMany({ where });
}
