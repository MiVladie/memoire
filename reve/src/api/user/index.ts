import {
	GetPlaylistsPayload,
	GetPlaylistsResponse,
	GetPlaylistSongsResponse,
	UpdatePayload,
	UpdateResponse,
	UpdatePasswordPayload,
	UpdatePasswordResponse,
	RemoveImageResponse,
	UploadImageResponse,
	UploadImagePayload
} from 'api/user/types';
import { API } from 'constants/api';
import { paramify } from 'utils/api';

import Request from 'shared/Request';

export function getPlaylists(payload: GetPlaylistsPayload): Promise<GetPlaylistsResponse> {
	return Request.get<GetPlaylistsResponse, GetPlaylistsPayload>(API + `/me/playlists${paramify(payload)}`);
}

export function getPlaylistSongs(playlistId: number): Promise<GetPlaylistSongsResponse> {
	return Request.get<GetPlaylistSongsResponse>(API + `/me/playlists/${playlistId}/songs`);
}

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
