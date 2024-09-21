import { ErrorRequestHandler } from 'express';
import { ErrorResponseBody } from './api';

export type ErrorHandler = ErrorRequestHandler<null, ErrorResponseBody>;

export type ErrorKey =
	| 'VALIDATION'
	| 'NOT_FOUND'
	| 'NAME_ALREADY_IN_USE'
	| 'EMAIL_ALREADY_TAKEN'
	| 'RECOVERY_INVALID'
	| 'RECOVERY_EXPIRED'
	| 'UNAUTHORIZED'
	| 'FORBIDDEN'
	| 'INTERNAL_SERVER_ERROR'
	| 'UNKNOWN';
export type ErrorType = 'MEMOIRE' | 'INTERNAL' | 'NETWORK' | 'UNKNOWN';

export type ErrorMeta = { [key: string]: string } | null;

export interface ErrorPayload {
	type: ErrorType;
	status: number;
	message: string;
	meta?: ErrorMeta;
}

export type ErrorOptions = {
	[K in ErrorKey]: ErrorPayload;
};
