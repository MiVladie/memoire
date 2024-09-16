import { PostSignInHandler } from './types';

import * as authService from '@/services/auth';

export const postSignIn: PostSignInHandler = async (req, res, next) => {
	const { name, password } = req.body;

	const { user, token } = await authService.signIn({ name, password });

	res.status(200).json({
		user,
		token,
		message: 'Authentication successful!'
	});
};
