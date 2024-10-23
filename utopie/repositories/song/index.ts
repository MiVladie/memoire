import { excludeKeys } from '@/util/optimization';
import { CreateParams, FindOneParams, FindManyParams, UpdateParams, RemoveParams } from './types';
import { Song } from '@/interfaces/models';
import { Platform } from '@/constants';

import db from '@/config/db';

export async function create(data: CreateParams) {
	const soundcloudData: any = {
		soundcloudSong: {
			create: {
				soundcloudTrackId: data.soundcloudId
			}
		}
	};

	return db.song.create({
		data: {
			...excludeKeys(data, ['soundcloudId']),
			...(data.platformId === Platform.SoundCloud.id ? soundcloudData : {})
		}
	});
}

export function findOne(where: FindOneParams) {
	return db.song.findFirst({
		where: {
			...excludeKeys(where, ['soundcloudTrackId']),
			...(where.soundcloudTrackId ? { soundcloudSong: { soundcloudTrackId: where.soundcloudTrackId } } : {})
		},
		include: {
			soundcloudSong: true
		}
	}) as Promise<Song>;
}

export function findMany(where?: FindManyParams) {
	return db.song.findMany({ where });
}

export function update(id: number, data: UpdateParams) {
	return db.song.update({ where: { id }, data });
}

export async function remove(where: RemoveParams) {
	await db.song.deleteMany({ where });
}
