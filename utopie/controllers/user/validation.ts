import { PatchPasswordHandler, PatchPasswordRequestBody, PatchUpdateHandler, PatchUpdateRequestBody } from './types';
import { validate } from '@/util/validation';

import joi from 'joi';

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
