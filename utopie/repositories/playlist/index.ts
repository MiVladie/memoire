import { excludeKeys } from '@/util/optimization';
import { CreateParams, FindOneParams, FindManyParams, FindSongsParams, RemoveParams } from './types';
import { Pagination } from '@/config/app';
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
		}
	});
}

export function findOne(where: FindOneParams) {
	return db.playlist.findFirst({ where });
}

export function findMany(where?: FindManyParams) {
	return db.playlist.findMany({ where });
}

export async function findSongs(where: FindSongsParams, cursor?: number) {
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
				include: { song: true },
				orderBy: { order: 'desc' },
				take: Pagination.SONGS_LIMIT,
				...pagination
			}
		}
	});

	return songs.map((data) => data.song);
}

export async function addSong(id: number, songId: number, order?: number) {
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
