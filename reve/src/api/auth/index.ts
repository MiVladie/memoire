import {
	AuthenticatePayload,
	AuthenticateResponse,
	SignInPayload,
	SignInResponse,
	SignUpPayload,
	SignUpResponse
} from 'api/auth/types';
import { API } from 'constants/api';
import { paramify } from 'utils/api';

import Request from 'shared/Request';

export function authenticate(payload: AuthenticatePayload): Promise<AuthenticateResponse> {
	return Request.get<AuthenticateResponse, AuthenticatePayload>(API + `/auth/authenticate${paramify(payload)}`);
}

export function signIn(payload: SignInPayload): Promise<SignInResponse> {
	return Request.post<SignInResponse, SignInPayload>(API + '/auth/signin', payload);
}

export function signUp(payload: SignUpPayload): Promise<SignUpResponse> {
	return Request.post<SignUpResponse, SignUpPayload>(API + '/auth/signup', payload);
}
