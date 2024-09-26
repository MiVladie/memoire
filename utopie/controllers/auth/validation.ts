import {
	GetAuthenticateInHandler,
	GetAuthenticateQueryParams,
	PostRecoverHandler,
	PostRecoverRequestBody,
	PostVerifyHandler,
	PostVerifyRequestBody,
	PostSignInHandler,
	PostSignInRequestBody,
	PostSignUpHandler,
	PostSignUpRequestBody,
	PostResetHandler,
	PostResetRequestBody
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
			email: joi.string().email().required(),
			password: joi.string().min(8).max(15).required()
		},
		req.body
	);

	next();
};

export const recover: PostRecoverHandler = (req, res, next) => {
	validate<PostRecoverRequestBody>(
		{
			email: joi.string().email().required()
		},
		req.body
	);

	next();
};

export const verify: PostVerifyHandler = (req, res, next) => {
	validate<PostVerifyRequestBody>(
		{
			email: joi.string().email().required(),
			code: joi.string().required()
		},
		req.body
	);

	next();
};

export const reset: PostResetHandler = (req, res, next) => {
	validate<PostResetRequestBody>(
		{
			password: joi.string().min(8).max(15).required(),
			token: joi.string().required()
		},
		req.body
	);

	next();
};
