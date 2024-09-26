import {
	GetAuthenticateInHandler,
	PostSignInHandler,
	PostSignUpHandler,
	PostRecoverHandler,
	PostVerifyHandler,
	PostResetHandler
} from './types';
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

export const postRecover: PostRecoverHandler = async (req, res, next) => {
	const { email } = req.body;

	const { code, expiresAt } = await authService.recover({ email });

	// TODO: send email
	console.log({ code, expiresAt });

	res.status(200).json({
		message: 'Recovery email was sent successfully!'
	});
};

export const postVerify: PostVerifyHandler = async (req, res, next) => {
	const { email, code } = req.body;

	const { token } = await authService.verify({ email, code });

	res.status(200).json({
		token,
		message: 'Recovery code was verified successfully!'
	});
};

export const postReset: PostResetHandler = async (req, res, next) => {
	const { password, token } = req.body;

	await authService.reset({ token, password });

	res.status(200).json({
		message: 'Password was reset successfully!'
	});
};
