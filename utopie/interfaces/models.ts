import { SoundCloudPlaylistType } from '@/interfaces/soundcloud';

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
	theme: string;
}

export interface Playlist {
	id: number;
	name: string;
	platformId: number;
	userId: number;

	soundcloudPlaylist: {
		soundcloudPlaylistId: number | null;
		playlistId: number;
		type: SoundCloudPlaylistType;
	} | null;
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
}
