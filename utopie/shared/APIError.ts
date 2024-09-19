import { ErrorPayload, ErrorMeta, ErrorType, ErrorOptions } from '@/interfaces/error';

export default class APIError extends Error {
	public type: ErrorType;
	public status: number;
	public message: string;
	public meta?: ErrorMeta;

	constructor(payload: ErrorPayload, overrides?: Partial<ErrorPayload>) {
		super();

		Object.assign(payload, overrides);

		this.type = payload.type;
		this.status = payload.status;
		this.message = payload.message;

		if (payload.meta) {
			this.meta = payload.meta;
		}

		Error.captureStackTrace(this, this.constructor);
	}
}

export enum Types {
	MEMOIRE = 'MEMOIRE',
	INTERNAL = 'INTERNAL',
	NETWORK = 'NETWORK',
	UNKNOWN = 'UNKNOWN'
}

export const Errors: ErrorOptions = {
	// Client Errors
	VALIDATION: {
		type: Types.MEMOIRE,
		status: 422,
		message: 'Validation Errors.'
	},
	NAME_ALREADY_IN_USE: {
		type: Types.MEMOIRE,
		status: 409,
		message: 'The given name is already taken.',
		meta: {
			name: 'The given name is already taken.'
		}
	},
	EMAIL_ALREADY_TAKEN: {
		type: Types.MEMOIRE,
		status: 409,
		message: 'The given email address is already taken.',
		meta: {
			email: 'The given email address is already taken.'
		}
	},
	UNAUTHORIZED: {
		type: Types.NETWORK,
		status: 401,
		message: 'Unauthorized'
	},
	FORBIDDEN: {
		type: Types.NETWORK,
		status: 403,
		message: 'Forbidden'
	},

	// Server Errors
	INTERNAL_SERVER_ERROR: {
		type: Types.INTERNAL,
		status: 500,
		message: 'Something went wrong, please try again later.'
	},
	UNKNOWN: {
		type: Types.UNKNOWN,
		status: 500,
		message: 'Something went wrong, please try again later.'
	}
};
