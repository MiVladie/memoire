export interface IPlatform {
	id: number;
	name: string;
	theme_color: string;
	playlists: IPlaylist[];
}

export interface IPlaylist {
	id: number;
	name: string;
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
