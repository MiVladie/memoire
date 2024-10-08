import { SoundCloudPlaylistType } from '@/interfaces/soundcloud';

export interface PlaylistDTO {
	id: number;
	name: string;
}

export interface CreatePlaylistDTO {
	name: string;
	platformId: number;
	userId: number;

	type?: SoundCloudPlaylistType;
	soundcloudId?: number;
}
