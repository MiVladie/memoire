import { UserDTO } from '@/dtos/user/types';

export interface AuthenticateParams {
	token: string;
}

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

export interface RecoverParams {
	email: string;
}

export interface RecoveryType {
	code: string;
	expiresAt: Date;
}

export interface VerifyParams {
	email: string;
	code: string;
}

export interface VerifyType {
	token: string;
}

export interface ResetParams {
	token: string;
	password: string;
}
