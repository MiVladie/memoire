import { PostSignInHandler, PostSignInRequestBody } from './types';
import { validate } from '@/util/validation';

import joi from 'joi';

export const signIn: PostSignInHandler = (req, res, next) => {
	validate<PostSignInRequestBody>(
		{
			name: joi.string().required(),
			password: joi.string().required()
		},
		req.body
	);

	next();
};
