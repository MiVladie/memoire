export interface IPlatform {
	id: number;
	name: string;
}

export interface IPlaylist {
	id: number;
	name: string;
	type: EPlaylistType;
	total: number;
	removed: number;
	date: string | Date;
}

export enum EPlaylistType {
	REPOST,
	LIKE,
	CUSTOM
}

export interface ISong {
	id: number;
	image: string | null;
	name: string;
	author: string;
	url: string;
	duration: number;
	is_present: boolean;
}

export interface ISetting {
	id: number;
	name: string;
}
