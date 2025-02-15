export interface SoundCloudSearchCollectionItem {
	id: number;
	permalink: string;
	kind: 'user' | 'track';
	avatar_url: string | null;
}

export interface SoundCloudUser {
	id: number;
	username: string | null;
	description: string | null;
	avatar_url: string | null;
	permalink: string;
	created_at: string;
}

export interface SoundCloudPlaylist {
	id: number;
	title: string;
	artwork_url: string | null;
	created_at: string;
	tracks: SoundCloudTrack[];
	track_count: number;
}

export type SoundCloudCollection = {
	created_at: string;
	track: SoundCloudTrack;
}[];

export interface SoundCloudTrack {
	id: number;
	title: string | null;
	full_duration: number;
	artwork_url: string | null;
	permalink_url: string;
	user: SoundCloudUser;
	media: {
		transcodings: {
			url: string;
			duration: number;
			format: {
				protocol: 'hls' | 'progressive';
				mime_type: 'audio/mpeg' | 'audio/ogg; codecs="opus"';
			};
		}[];
	};
}
