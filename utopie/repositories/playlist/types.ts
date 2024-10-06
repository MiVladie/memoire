import { Playlist } from '@prisma/client';

export interface CreateParams {
	name: string;
	platformId: number;
	userId: number;
	soundcloudId?: number;
}

export interface FindOneParams extends Partial<Playlist> {}

export interface FindManyParams extends Partial<Playlist> {}

export interface FindSongsParams extends Partial<Playlist> {
	id: number;
}
