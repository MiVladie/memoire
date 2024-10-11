import { SoundCloudUser } from '@/interfaces/soundcloud';
import { CreatePlaylistDTO } from '@/dtos/playlist/types';
import { CreateSongDTO } from '@/dtos/song/types';

export interface GetSoundCloudUserParams {
	name: string;
}

export interface GetSoundCloudUserType {
	user: SoundCloudUser;
}

export interface GetSoundCloudPlaylistsParams {
	userId: number;
	soundcloudUserId: number;
}

export interface GetSoundCloudPlaylistsType {
	playlists: CreatePlaylistDTO[];
}

export interface GetSoundCloudRepostsParams {
	soundcloudUserId: number;
}

export interface GetSoundCloudRepostsType {
	songs: CreateSongDTO[];
}

export interface GetSoundCloudLikesParams {
	soundcloudUserId: number;
}

export interface GetSoundCloudLikesType {
	songs: CreateSongDTO[];
}

export interface GetSoundCloudPlaylistSongsParams {
	soundcloudPlaylistId: number;
}

export interface GetSoundCloudPlaylistSongsType {
	songs: CreateSongDTO[];
}
