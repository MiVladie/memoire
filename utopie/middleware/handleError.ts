import { ErrorResponseBody } from '@/interfaces/api';
import { ErrorHandler } from '@/interfaces/error';

import APIError, { Errors } from '@/shared/APIError';

import * as Constants from '@/constants';

export const handleError: ErrorHandler = (error, _, res, next) => {
	let payload: ErrorResponseBody;

	if (error instanceof APIError) {
		payload = error;
	} else {
		payload = Errors.UNKNOWN;
	}

	// Log development errors
	if (Constants.Server.ENV === 'development') {
		Object.assign(payload, {
			message: error.message,
			stack: error.stack
		});
	}

	return res.status(payload.status).json(payload);
};

export default handleError;
