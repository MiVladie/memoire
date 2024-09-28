import {
	UpdatePayload,
	UpdateResponse,
	UpdatePasswordPayload,
	UpdatePasswordResponse,
	RemoveImageResponse,
	UploadImageResponse,
	UploadImagePayload
} from 'api/user/types';
import { API } from 'constants/api';

import Request from 'shared/Request';

export function update(payload: UpdatePayload): Promise<UpdateResponse> {
	return Request.patch<UpdateResponse, UpdatePayload>(API + '/me', payload);
}

export function updatePassword(payload: UpdatePasswordPayload): Promise<UpdatePasswordResponse> {
	return Request.patch<UpdatePasswordResponse, UpdatePasswordPayload>(API + '/me/password', payload);
}

export function uploadImage({ image }: UploadImagePayload): Promise<UploadImageResponse> {
	const payload = new FormData();
	payload.append('file', image);

	return Request.post<UploadImageResponse>(API + '/me/image', payload);
}

export function removeImage(): Promise<RemoveImageResponse> {
	return Request.delete<RemoveImageResponse>(API + '/me/image');
}
