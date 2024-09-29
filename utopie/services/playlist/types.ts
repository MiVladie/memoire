import { PlaylistDTO } from '@/dtos/playlist/types';

export interface GetParams {
	userId: number;
	platformId: number;
}

export interface GetType {
	playlists: PlaylistDTO[];
}
