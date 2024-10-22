import { Playlist } from '@prisma/client';
import { SoundCloudPlaylistType } from '@/interfaces/soundcloud';

export interface CreateParams {
	name: string;
	platformId: number;
	userId: number;

	type?: SoundCloudPlaylistType;
	soundcloudId?: number;
}

export interface FindOneParams extends Partial<Playlist> {}

export interface FindManyParams extends Partial<Playlist> {}

export interface FindSongsParams extends Partial<Playlist> {
	id: number;
	search?: string;
	isPresent?: boolean;
}

export interface RemoveParams extends Partial<Playlist> {}
