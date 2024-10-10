import { SearchPayload, SearchResponse, GetUserResponse, GetUserPlaylistsResponse } from '@/api/soundcloud/types';
import { paramify } from '@/util/api';
import { API } from '@/constants';

import Request from 'shared/Request';

const defaultParams = { client_id: API.SoundCloud.CLIENT_ID };

export function search({ query, ...payload }: SearchPayload): Promise<SearchResponse> {
	return Request.get<SearchResponse>(
		API.SoundCloud.BASE_URL + `/search${paramify({ q: query, ...payload, ...defaultParams })}`
	);
}

export function getUser(id: number): Promise<GetUserResponse> {
	return Request.get<GetUserResponse>(API.SoundCloud.BASE_URL + `/users/${id}${paramify(defaultParams)}`);
}

export function getPlaylists(userId: number): Promise<GetUserPlaylistsResponse> {
	return Request.get<GetUserPlaylistsResponse>(
		API.SoundCloud.BASE_URL + `/users/${userId}/playlists${paramify(defaultParams)}`
	);
}
