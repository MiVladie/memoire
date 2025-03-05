import {
	GetPlaylistsHandler,
	GetPlaylistSongsHandler,
	GetPlaylistSongsRequestParams,
	GetPlaylistsQueryParams,
	PutSoundCloudHandler,
	PutSoundCloudRequestBody,
	PatchPasswordHandler,
	PatchPasswordRequestBody,
	PatchUpdateHandler,
	PatchUpdateRequestBody,
	GetPlaylistSongsQueryParams
} from './types';
import { validate } from '@/util/validation';

import joi from 'joi';

export const playlists: GetPlaylistsHandler = (req, res, next) => {
	validate<GetPlaylistsQueryParams>(
		{
			platformId: joi.string().required()
		},
		req.query
	);

	next();
};

export const playlistSongs: GetPlaylistSongsHandler = (req, res, next) => {
	validate<GetPlaylistSongsRequestParams>(
		{
			playlistId: joi.string().required()
		},
		req.params
	);

	validate<GetPlaylistSongsQueryParams>(
		{
			search: joi.string(),
			seed: joi.string(),
			isPresent: joi.string().regex(/^[0-1]+$/),
			limit: joi.string().regex(/^[0-9]+$/),
			cursor: joi.string().regex(/^[0-9]+$/)
		},
		req.query
	);

	next();
};

export const update: PatchUpdateHandler = (req, res, next) => {
	validate<PatchUpdateRequestBody>(
		{
			name: joi.string(),
			soundcloudName: joi.string()
		},
		req.body
	);

	next();
};

export const soundCloud: PutSoundCloudHandler = (req, res, next) => {
	validate<PutSoundCloudRequestBody>(
		{
			soundcloudName: joi.string().required()
		},
		req.body
	);

	next();
};

export const password: PatchPasswordHandler = (req, res, next) => {
	validate<PatchPasswordRequestBody>(
		{
			password: joi.string().required(),
			newPassword: joi.string().required()
		},
		req.body
	);

	next();
};
