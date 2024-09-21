import { RequestHandler } from 'express';
import { ResponseBody } from '@/interfaces/api';
import { UserDTO } from '@/dtos/user/types';

interface GetAuthenticateResponseBody extends ResponseBody {
	user: UserDTO;
	token: string;
}

export interface GetAuthenticateQueryParams {
	token?: string;
}

export type GetAuthenticateInHandler = RequestHandler<{}, GetAuthenticateResponseBody, {}, GetAuthenticateQueryParams>;

export interface PostSignInRequestBody {
	name: string;
	password: string;
}

interface PostSignInResponseBody extends ResponseBody {
	user: UserDTO;
	token: string;
}

export type PostSignInHandler = RequestHandler<{}, PostSignInResponseBody, PostSignInRequestBody>;

export interface PostSignUpRequestBody {
	name: string;
	email: string;
	password: string;
}

interface PostSignUpResponseBody extends ResponseBody {
	user: UserDTO;
	token: string;
}

export type PostSignUpHandler = RequestHandler<{}, PostSignUpResponseBody, PostSignUpRequestBody>;

export interface PostRecoverRequestBody {
	email: string;
}

interface PostRecoverResponseBody extends ResponseBody {}

export type PostRecoverHandler = RequestHandler<{}, PostRecoverResponseBody, PostRecoverRequestBody>;

export interface PostVerifyRequestBody {
	email: string;
	code: string;
}

interface PostVerifyResponseBody extends ResponseBody {
	token: string;
}

export type PostVerifyHandler = RequestHandler<{}, PostVerifyResponseBody, PostVerifyRequestBody>;

export interface PostResetQueryParams {
	token: string;
}

export interface PostResetRequestBody {
	password: string;
}

interface PostResetResponseBody extends ResponseBody {}

export type PostResetHandler = RequestHandler<{}, PostResetResponseBody, PostResetRequestBody, PostResetQueryParams>;
