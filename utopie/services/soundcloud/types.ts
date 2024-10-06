import { CreatePlaylistDTO } from '@/dtos/playlist/types';
import { SoundCloudUser } from '@/interfaces/soundcloud';

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
