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
	cursor?: number;
}

export interface GetSongsType {
	songs: SongDTO[];
}

export interface AddPlaylistsParams {
	playlists: CreatePlaylistDTO[];
}

export type AddPlaylistsType = void;

export interface AddSoundCloudPlaylistParams {
	playlistId: number;
	playlist: Required<Pick<CreatePlaylistDTO, 'soundcloudId'>> & CreatePlaylistDTO;
}

export type AddSoundCloudPlaylistType = void;

export interface RemovePlaylistsParams {
	userId?: number;
	platformId?: number;
}

export type RemovePlaylistsType = void;
