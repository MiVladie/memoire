import { Playlist } from '@prisma/client';

export interface FindOneParams extends Partial<Playlist> {}

export interface FindManyParams extends Partial<Playlist> {}

export interface FindSongsParams extends Partial<Playlist> {
	id: number;
}
