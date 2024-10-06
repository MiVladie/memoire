import { SoundCloudSearchCollectionItem, SoundCloudUser, SoundCloudPlaylist } from '@/interfaces/soundcloud';

export interface SearchPayload {
	query: string;
}

export interface SearchResponse {
	collection: SoundCloudSearchCollectionItem[];
}

export type GetUserResponse = SoundCloudUser;

export type GetUserPlaylistsResponse = {
	collection: SoundCloudPlaylist[];
};
