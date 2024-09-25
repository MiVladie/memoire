import { validate } from '@/util/validation';
import { PatchUpdateHandler, PatchUpdateRequestBody } from './types';

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
