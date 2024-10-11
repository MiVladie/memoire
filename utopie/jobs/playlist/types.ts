import { CreatePlaylistDTO } from '@/dtos/playlist/types';

export const QUEUE_NAME = 'PLAYLIST';

export const JOBS = {
	ADD_SOUNDCLOUD_PLAYLIST: 'ADD_SOUNDCLOUD_PLAYLIST'
};

export interface AddSoundCloudPlaylistPayload {
	playlistId: number;
	playlist: Required<Pick<CreatePlaylistDTO, 'soundcloudId'>> & CreatePlaylistDTO;
}

export type Payload = AddSoundCloudPlaylistPayload;

export type Jobs = (typeof JOBS)[keyof typeof JOBS];
