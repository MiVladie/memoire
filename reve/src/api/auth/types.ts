import { ResponseBody } from 'interfaces/api';
import { User } from 'interfaces/models';

export interface AuthenticatePayload {
	token: string;
}

export interface AuthenticateResponse extends ResponseBody {
	user: User;
	token: string;
}

export interface SignInPayload {
	name: string;
	password: string;
}

export interface SignInResponse extends ResponseBody {
	user: User;
	token: string;
}

export interface SignUpPayload {
	name: string;
	email: string;
	password: string;
}

export interface SignUpResponse extends ResponseBody {
	user: User;
	token: string;
}
