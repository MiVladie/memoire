import { RequestHandler } from 'express';
import { ResponseBody, WithFileLocals, WithUserLocals } from '@/interfaces/api';
import { UserDTO } from '@/dtos/user/types';
import { PlaylistDTO } from '@/dtos/playlist/types';
import { SongDTO } from '@/dtos/song/types';

export interface GetPlaylistsQueryParams {
	platformId: string;
}

export interface GetPlaylistsResponseBody extends ResponseBody {
	playlists: PlaylistDTO[];
}

export type GetPlaylistsHandler = RequestHandler<
	unknown,
	GetPlaylistsResponseBody,
	unknown,
	GetPlaylistsQueryParams,
	WithUserLocals
>;

export interface GetPlaylistSongsRequestParams {
	playlistId: string;
}

export interface GetPlaylistSongsQueryParams {
	limit?: string;
	cursor?: string;
}

export interface GetPlaylistSongsResponseBody extends ResponseBody {
	songs: SongDTO[];
}

export type GetPlaylistSongsHandler = RequestHandler<
	GetPlaylistSongsRequestParams,
	GetPlaylistSongsResponseBody,
	unknown,
	GetPlaylistSongsQueryParams,
	WithUserLocals
>;

export interface PatchUpdateRequestBody {
	name?: string;
	soundcloudName?: string;
}

export interface PatchUpdateResponseBody extends ResponseBody {
	user: UserDTO;
}

export type PatchUpdateHandler = RequestHandler<
	unknown,
	PatchUpdateResponseBody,
	PatchUpdateRequestBody,
	unknown,
	WithUserLocals
>;

export interface PutSoundCloudRequestBody {
	soundcloudName: string;
}

export interface PutSoundCloudResponseBody extends ResponseBody {
	user: UserDTO;
}

export type PutSoundCloudHandler = RequestHandler<
	unknown,
	PutSoundCloudResponseBody,
	PutSoundCloudRequestBody,
	unknown,
	WithUserLocals
>;

export interface PatchPasswordRequestBody {
	password: string;
	newPassword: string;
}

export type PatchPasswordHandler = RequestHandler<
	unknown,
	ResponseBody,
	PatchPasswordRequestBody,
	unknown,
	WithUserLocals
>;

export interface PostImageResponseBody extends ResponseBody {
	user: UserDTO;
}

export type PostImageLocals = WithFileLocals & WithUserLocals;

export type PostImageHandler = RequestHandler<unknown, PostImageResponseBody, unknown, unknown, PostImageLocals>;

export interface DeleteImageResponseBody extends ResponseBody {
	user: UserDTO;
}

export type DeleteImageHandler = RequestHandler<unknown, DeleteImageResponseBody, unknown, unknown, WithUserLocals>;

export interface DeleteSoundCloudResponseBody extends ResponseBody {
	user: UserDTO;
}

export type DeleteSoundCloudHandler = RequestHandler<
	unknown,
	DeleteSoundCloudResponseBody,
	unknown,
	unknown,
	WithUserLocals
>;
