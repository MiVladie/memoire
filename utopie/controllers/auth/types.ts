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

export type GetAuthenticateInHandler = RequestHandler<
	unknown,
	GetAuthenticateResponseBody,
	unknown,
	GetAuthenticateQueryParams
>;

export interface PostSignInRequestBody {
	name: string;
	password: string;
}

interface PostSignInResponseBody extends ResponseBody {
	user: UserDTO;
	token: string;
}

export type PostSignInHandler = RequestHandler<unknown, PostSignInResponseBody, PostSignInRequestBody>;

export interface PostSignUpRequestBody {
	name: string;
	email: string;
	password: string;
}

interface PostSignUpResponseBody extends ResponseBody {
	user: UserDTO;
	token: string;
}

export type PostSignUpHandler = RequestHandler<unknown, PostSignUpResponseBody, PostSignUpRequestBody>;

export interface PostRecoverRequestBody {
	email: string;
}

export type PostRecoverHandler = RequestHandler<unknown, ResponseBody, PostRecoverRequestBody>;

export interface PostVerifyRequestBody {
	email: string;
	code: string;
}

interface PostVerifyResponseBody extends ResponseBody {
	token: string;
}

export type PostVerifyHandler = RequestHandler<unknown, PostVerifyResponseBody, PostVerifyRequestBody>;

export interface PostResetRequestBody {
	token: string;
	password: string;
}

export type PostResetHandler = RequestHandler<unknown, ResponseBody, PostResetRequestBody>;
