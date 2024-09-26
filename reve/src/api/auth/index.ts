import {
	AuthenticatePayload,
	AuthenticateResponse,
	RecoverPayload,
	RecoverResponse,
	ResetPayload,
	ResetResponse,
	SignInPayload,
	SignInResponse,
	SignUpPayload,
	SignUpResponse,
	VerifyPayload,
	VerifyResponse
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

export function recover(payload: RecoverPayload): Promise<RecoverResponse> {
	return Request.post<RecoverResponse, RecoverPayload>(API + '/auth/recover', payload);
}

export function verify(payload: VerifyPayload): Promise<VerifyResponse> {
	return Request.post<VerifyResponse, VerifyPayload>(API + '/auth/verify', payload);
}

export function reset(payload: ResetPayload): Promise<ResetResponse> {
	return Request.post<ResetResponse, ResetPayload>(API + '/auth/reset', payload);
}
