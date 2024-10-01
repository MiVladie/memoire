import { UserDTO } from '@/dtos/user/types';
import { ErrorType, ErrorMeta } from './error';
import { RequestHandler } from 'express';

export interface QueryParams {
	[key: string]: any;
}

export interface ResponseBody {
	message: string;
}

export interface ErrorResponseBody {
	type: ErrorType;
	status: number;
	message: string;
	meta?: ErrorMeta;
	stack?: string;
}

export interface WithUserLocals {
	user: UserDTO;
}

export type WithUserRequestHandler = RequestHandler<unknown, unknown, unknown, unknown, WithUserLocals>;

export interface WithFileLocals {
	file: Express.Multer.File;
}

export type WithFileRequestHandler = RequestHandler<any, any, any, any, WithFileLocals>;
