import { SearchPayload, SearchResponse, GetUserResponse } from '@/api/soundcloud/types';
import { SOUNDCLOUD_API, SOUNDCLOUD_CLIENT_ID } from '@/constants/api';
import { paramify } from '@/util/api';

import Request from 'shared/Request';

const defaultParams = { client_id: SOUNDCLOUD_CLIENT_ID };

export function search({ query, ...payload }: SearchPayload): Promise<SearchResponse> {
	return Request.get<SearchResponse>(
		SOUNDCLOUD_API + `/search${paramify({ q: query, ...payload, ...defaultParams })}`
	);
}

export function getUser(id: number): Promise<GetUserResponse> {
	return Request.get<GetUserResponse>(SOUNDCLOUD_API + `/users/${id}${paramify(defaultParams)}`);
}
