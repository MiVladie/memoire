import { Song } from '@prisma/client';

export interface CreateParams {
	name: string;
	image: string | null;
	author: string;
	url: string;
	duration: number;
	isPresent: boolean;
	platformId: number;

	soundcloudId?: number;
}

export interface FindOneParams extends Partial<Song> {
	soundcloudTrackId?: number;
}

export interface FindManyParams extends Partial<Song> {}

export interface RemoveParams extends Partial<Song> {}
