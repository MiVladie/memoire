import { PlaylistType } from '@/interfaces/models';

export interface PlaylistDTO {
	id: number;
	name: string;
	type: PlaylistType;
	total_songs: number;
	removed_songs: number;
	date_updated: Date;
}

export interface CreatePlaylistDTO {
	name: string;
	type: PlaylistType;
	total_songs?: number;
	removed_songs?: number;
	date_updated?: Date;

	platformId: number;
	userId: number;

	soundcloudId?: number;
}
