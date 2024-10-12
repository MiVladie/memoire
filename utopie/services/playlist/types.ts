import { CreatePlaylistDTO, PlaylistDTO } from '@/dtos/playlist/types';
import { SongDTO } from '@/dtos/song/types';
import { Playlist } from '@/interfaces/models';

export interface GetParams {
	userId: number;
	platformId: number;
}

export interface GetType {
	playlists: PlaylistDTO[];
}

export interface GetSongsParams {
	playlistId: number;
	limit?: number;
	cursor?: number;
}

export interface GetSongsType {
	songs: SongDTO[];
}

export interface AddPlaylistsParams {
	playlists: CreatePlaylistDTO[];
}

export type AddPlaylistsType = void;

export interface PopulatePlaylistParams {
	playlistId: number;
}

export type PopulatePlaylistType = void;

export interface PopulateSoundCloudPlaylistParams {
	playlist: Playlist;
}

export type PopulateSoundCloudPlaylistType = void;

export interface RemovePlaylistsParams {
	userId?: number;
	platformId?: number;
}

export type RemovePlaylistsType = void;
