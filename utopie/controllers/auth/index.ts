import { GetAuthenticateInHandler, PostSignInHandler, PostSignUpHandler } from './types';
import { extractToken } from '@/util/auth';

import APIError, { Errors } from '@/shared/APIError';

import * as authService from '@/services/auth';

export const getAuthenticate: GetAuthenticateInHandler = async (req, res, next) => {
	const token = req.query.token || extractToken(req.get('Authorization'));

	if (!token) {
		throw new APIError(Errors.UNAUTHORIZED, { message: 'Provide a bearer token!' });
	}

	const { user } = await authService.authenticate({ token });

	res.status(200).json({
		user,
		token,
		message: 'User authenticated successfully!'
	});
};

export const postSignIn: PostSignInHandler = async (req, res, next) => {
	const { name, password } = req.body;

	const { user, token } = await authService.signIn({ name, password });

	res.status(200).json({
		user,
		token,
		message: 'User signed in successfully!'
	});
};

export const postSignUp: PostSignUpHandler = async (req, res, next) => {
	const { name, email, password } = req.body;

	const { user, token } = await authService.signUp({ name, email, password });

	res.status(200).json({
		user,
		token,
		message: 'User signed up successfully!'
	});
};
