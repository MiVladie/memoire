import { PostSignInHandler, PostSignUpHandler } from './types';

import * as authService from '@/services/auth';

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
