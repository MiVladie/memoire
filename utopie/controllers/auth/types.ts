import { RequestHandler } from 'express';
import { ResponseBody } from '@/interfaces/api';
import { UserDTO } from '@/dtos/user/types';

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
