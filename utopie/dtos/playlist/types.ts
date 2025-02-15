import { PlaylistType } from '@/interfaces/models';

export interface PlaylistDTO {
	id: number;
	name: string;
	type: PlaylistType;
}

export interface CreatePlaylistDTO {
	name: string;
	type: PlaylistType;

	platformId: number;
	userId: number;

	soundcloudId?: number;
}
