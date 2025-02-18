export interface User {
	id: number;
	name: string;
	email: string;
	image: string | null;
	soundcloudId: number | null;
}

export interface Platform {
	id: number;
	name: string;
}

export interface Playlist {
	id: number;
	name: string;
	type: PlaylistType;
	total_songs: number;
	removed_songs: number;
	date_updated: string | Date;
}

export type PlaylistType = 'REPOSTS' | 'LIKES' | 'CUSTOM';

export interface Song {
	id: number;
	name: string;
	image: string | null;
	author: string;
	url: string;
	duration: number;
	isPresent: boolean;
}
