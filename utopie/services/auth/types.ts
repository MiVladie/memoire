import { UserDTO } from '@/dtos/user/types';

export interface SignInParams {
	name: string;
	password: string;
}

export interface SignUpParams {
	name: string;
	email: string;
	password: string;
}

export interface AuthType {
	user: UserDTO;
	token: string;
}
