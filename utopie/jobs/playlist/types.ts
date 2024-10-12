export const QUEUE_NAME = 'PLAYLIST';

export const SCHEDULERS = {
	POPULATE_PLAYLIST: 'POPULATE_PLAYLIST'
};

export const JOBS = {
	POPULATE_PLAYLIST: 'POPULATE_PLAYLIST'
};

export interface PopulatePlaylistPayload {
	playlistId: number;
}

export type Payload = PopulatePlaylistPayload;

export type Jobs = (typeof JOBS)[keyof typeof JOBS];
