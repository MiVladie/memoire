import { WithUserRequestHandler } from '@/interfaces/api';
import { extractToken } from '@/util/auth';

import APIError, { Errors } from '@/shared/APIError';

import * as authService from '@/services/auth';

const withUser: WithUserRequestHandler = async (req, res, next) => {
	const token = extractToken(req.get('Authorization'));

	if (!token) {
		throw new APIError(Errors.UNAUTHORIZED, { message: 'Provide a bearer token!' });
	}

	const { user } = await authService.authenticate({ token });

	res.locals.user = user;

	next();
};

export default withUser;
