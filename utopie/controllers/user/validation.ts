import {
	GetPlaylistsHandler,
	GetPlaylistSongsHandler,
	GetPlaylistSongsRequestParams,
	GetPlaylistsQueryParams,
	PatchPasswordHandler,
	PatchPasswordRequestBody,
	PatchUpdateHandler,
	PatchUpdateRequestBody
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

	next();
};

export const update: PatchUpdateHandler = (req, res, next) => {
	validate<PatchUpdateRequestBody>(
		{
			name: joi.string()
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
