import { RequestHandler } from 'express';
import { ResponseBody } from '@/interfaces/api';

export interface PostSignInRequestBody {
	name: string;
	password: string;
}

interface PostSignInResponseBody extends ResponseBody {
	user: {
		id: number;
		name: string;
		email: string;
		image: string | null;
	};
	token: string;
}

export type PostSignInHandler = RequestHandler<{}, PostSignInResponseBody, PostSignInRequestBody>;

export interface PostSignUpRequestBody {
	name: string;
	email: string;
	password: string;
}

interface PostSignUpResponseBody extends ResponseBody {
	user: {
		id: number;
		name: string;
		email: string;
		image: string | null;
	};
	token: string;
}

export type PostSignUpHandler = RequestHandler<{}, PostSignUpResponseBody, PostSignUpRequestBody>;
