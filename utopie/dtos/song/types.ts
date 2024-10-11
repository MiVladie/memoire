export interface SongDTO {
	id: number;
	name: string;
	image: string | null;
	author: string;
	url: string;
	duration: number;
	isPresent: boolean;
}

export interface CreateSongDTO {
	name: string;
	image: string | null;
	author: string;
	url: string;
	duration: number;
	isPresent: boolean;
	platformId: number;

	soundcloudId?: number;
}
