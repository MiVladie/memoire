import { RequestHandler } from 'express';
import { ResponseBody, WithFileLocals, WithUserLocals } from '@/interfaces/api';
import { UserDTO } from '@/dtos/user/types';

export interface PatchUpdateRequestBody {
	name?: string;
}

export interface PatchUpdateResponseBody extends ResponseBody {
	user: UserDTO;
}

export type PatchUpdateHandler = RequestHandler<
	unknown,
	PatchUpdateResponseBody,
	PatchUpdateRequestBody,
	unknown,
	WithUserLocals
>;

export interface PatchPasswordRequestBody {
	password: string;
	newPassword: string;
}

export type PatchPasswordHandler = RequestHandler<
	unknown,
	ResponseBody,
	PatchPasswordRequestBody,
	unknown,
	WithUserLocals
>;

export interface PostImageResponseBody extends ResponseBody {
	user: UserDTO;
}

export type PostImageLocals = WithFileLocals & WithUserLocals;

export type PostImageHandler = RequestHandler<unknown, PostImageResponseBody, unknown, unknown, PostImageLocals>;

export interface DeleteImageResponseBody extends ResponseBody {
	user: UserDTO;
}

export type DeleteImageHandler = RequestHandler<unknown, DeleteImageResponseBody, unknown, unknown, WithUserLocals>;
