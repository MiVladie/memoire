import { ErrorResponseBody } from '@/interfaces/api';
import { ErrorHandler } from '@/interfaces/error';
import { writeToFile } from '@/util/file';

import APIError, { Errors } from '@/shared/APIError';

import * as Server from '@/config/server';

export const handleError: ErrorHandler = (error, _, res, next) => {
	let payload: ErrorResponseBody;

	if (error instanceof APIError) {
		payload = error;
	} else {
		payload = Errors.UNKNOWN;
	}

	writeToFile(`${new Date().toISOString()}_[ERRORS]`, {
		message: error.message,
		stack: error.stack
	});

	// Log development errors
	if (Server.ENV === 'development') {
		Object.assign(payload, {
			message: error.message,
			stack: error.stack
		});
	}

	return res.status(payload.status).json(payload);
};

export default handleError;
