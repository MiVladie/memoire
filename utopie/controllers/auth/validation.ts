import {
	GetAuthenticateInHandler,
	GetAuthenticateQueryParams,
	PostSignInHandler,
	PostSignInRequestBody,
	PostSignUpHandler,
	PostSignUpRequestBody
} from './types';
import { validate } from '@/util/validation';

import joi from 'joi';

export const authenticate: GetAuthenticateInHandler = (req, res, next) => {
	validate<GetAuthenticateQueryParams>(
		{
			token: joi.string()
		},
		req.query
	);

	next();
};

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

export const signUp: PostSignUpHandler = (req, res, next) => {
	validate<PostSignUpRequestBody>(
		{
			name: joi.string().required(),
			email: joi.string().required(),
			password: joi.string().min(8).max(15).required()
		},
		req.body
	);

	next();
};
