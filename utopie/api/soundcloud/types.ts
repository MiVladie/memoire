import {
	SoundCloudSearchCollectionItem,
	SoundCloudUser,
	SoundCloudPlaylist,
	SoundCloudCollection,
	SoundCloudTrack
} from '@/interfaces/soundcloud';

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

export interface GetRepostsPayload {
	limit?: number;
	offset?: string;
}

export interface GetRepostsResponse {
	collection: SoundCloudCollection;
	next_href: string;
}

export interface GetLikesPayload {
	limit?: number;
	offset?: string;
}

export interface GetLikesResponse {
	collection: SoundCloudCollection;
	next_href: string;
}

export type GetPlaylistResponse = SoundCloudPlaylist;

export type GetTracksResponse = SoundCloudTrack[];
