import { Playlist } from '@prisma/client';
import { PlaylistType } from '@/interfaces/models';

export interface CreateParams {
	name: string;
	type: PlaylistType;
	total_songs?: number;
	removed_songs?: number;
	date_updated?: Date;

	platformId: number;
	userId: number;

	soundcloudId?: number;
}

export interface FindOneParams extends Partial<Playlist> {}

export interface FindManyParams extends Partial<Playlist> {}

export interface FindSongsParams extends Partial<Playlist> {
	id: number;
	search?: string;
	isPresent?: boolean;
}

export interface UpdateParams {
	name?: string;
	total_songs?: number;
	removed_songs?: number;
	date_updated?: Date;
}

export interface RemoveParams extends Partial<Playlist> {}
