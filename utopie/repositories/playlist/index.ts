import { excludeKeys } from '@/util/optimization';
import { CreateParams, FindOneParams, FindManyParams, FindSongsParams, RemoveParams } from './types';
import { PLATFORMS } from '@/constants/db';

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
			...(data.platformId === PLATFORMS.SoundCloud.id ? soundcloudData : {})
		}
	});
}

export function findOne(where: FindOneParams) {
	return db.playlist.findFirst({ where });
}

export function findMany(where?: FindManyParams) {
	return db.playlist.findMany({ where });
}

export async function findSongs(where: FindSongsParams) {
	const { songs } = await db.playlist.findUniqueOrThrow({ where, include: { songs: { include: { song: true } } } });

	return songs.map((data) => data.song);
}

export async function remove(where: RemoveParams) {
	await db.playlist.deleteMany({ where });
}
