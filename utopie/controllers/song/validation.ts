import { GetMediaHandler, GetMediaParams } from './types';
import { validate } from '@/util/validation';

import joi from 'joi';

export const getMedia: GetMediaHandler = (req, res, next) => {
	validate<GetMediaParams>(
		{
			id: joi.string().regex(/^[0-9]+$/)
		},
		req.params
	);

	next();
};
