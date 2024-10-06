import { CreatePlaylistDTO, PlaylistDTO } from '@/dtos/playlist/types';
import { SongDTO } from '@/dtos/song/types';

export interface GetParams {
	userId: number;
	platformId: number;
}

export interface GetType {
	playlists: PlaylistDTO[];
}

export interface GetSongsParams {
	playlistId: number;
}

export interface GetSongsType {
	songs: SongDTO[];
}

export interface AddPlaylistsParams {
	playlists: CreatePlaylistDTO[];
}

export type AddPlaylistsType = void;
