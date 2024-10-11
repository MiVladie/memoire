import { ResponseBody } from 'interfaces/api';
import { Playlist, Song, User } from 'interfaces/models';

export interface GetPlaylistsPayload {
	platformId: number;
}

export interface GetPlaylistsResponse extends ResponseBody {
	playlists: Playlist[];
}

export interface GetPlaylistSongsPayload {
	cursor?: number;
}

export interface GetPlaylistSongsResponse extends ResponseBody {
	songs: Song[];
}

export interface UpdatePayload {
	name?: string;
	soundcloudName?: string;
}

export interface UpdateResponse extends ResponseBody {
	user: User;
}

export interface LinkSoundCloudPayload {
	soundcloudName: string;
}

export interface LinkSoundCloudResponse extends ResponseBody {
	user: User;
}

export interface UpdatePasswordPayload {
	password: string;
	newPassword: string;
}

export interface UpdatePasswordResponse extends ResponseBody {}

export interface UploadImagePayload {
	image: File;
}

export interface UploadImageResponse extends ResponseBody {
	user: User;
}

export interface RemoveImageResponse extends ResponseBody {
	user: User;
}

export interface UnlinkSoundCloudResponse extends ResponseBody {
	user: User;
}
