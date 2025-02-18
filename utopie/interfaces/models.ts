export interface User {
	id: number;
	name: string;
	email: string;
	password: string;
	image: string | null;
	createdAt: Date;
	soundcloudId: number | null;
}

export interface Recovery {
	id: number;
	code: string;
	expiresAt: Date;
	userId: number;
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
	date_updated: Date;

	platformId: number;
	userId: number;

	soundcloudPlaylist: {
		soundcloudPlaylistId: number | null;
		playlistId: number;
	} | null;
}

export enum PlaylistType {
	REPOSTS = 'REPOSTS',
	LIKES = 'LIKES',
	CUSTOM = 'CUSTOM'
}

export interface Song {
	id: number;
	name: string;
	image: string | null;
	author: string;
	url: string;
	duration: number;
	isPresent: boolean;
	platformId: number;

	soundcloudSong: {
		soundcloudTrackId: number;
	} | null;
}
