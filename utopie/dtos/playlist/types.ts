export interface PlaylistDTO {
	id: number;
	name: string;
}

export interface CreatePlaylistDTO {
	name: string;
	platformId: number;
	userId: number;
	soundcloudId?: number;
}
