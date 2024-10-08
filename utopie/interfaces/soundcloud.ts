export interface SoundCloudSearchCollectionItem {
	id: number;
	permalink: string;
	kind: 'user' | 'track';
	avatar_url: string | null;
}

export interface SoundCloudUser {
	id: number;
	username: string;
	description: string;
	avatar_url: string | null;
	permalink: string;
	created_at: string;
}

export interface SoundCloudPlaylist {
	id: number;
	title: string;
	avatar_url: string | null;
	created_at: string;
}

export enum SoundCloudPlaylistType {
	REPOSTS = 'REPOSTS',
	LIKES = 'LIKES',
	CUSTOM = 'CUSTOM'
}
