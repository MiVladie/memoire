import { excludeKeys } from '@/util/optimization';
import { CreateParams, FindOneParams, FindManyParams, FindSongsParams } from './types';

import db from '@/config/db';

export function create(data: CreateParams) {
	return db.playlist.create({
		data: {
			...excludeKeys(data, ['soundcloudId']),
			...(data.soundcloudId
				? {
						soundcloudPlaylist: {
							create: {
								soundcloudPlaylistId: data.soundcloudId
							}
						}
				  }
				: {})
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
