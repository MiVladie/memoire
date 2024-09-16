import { RequestHandler } from 'express';
import { ResponseBody } from '@/interfaces/api';

interface PostSignInResponseBody extends ResponseBody {
	user: {
		id: number;
		name: string;
		email: string;
		image: string | null;
	};
	token: string;
}

export interface PostSignInRequestBody {
	name: string;
	password: string;
}

export type PostSignInHandler = RequestHandler<{}, PostSignInResponseBody, PostSignInRequestBody>;
