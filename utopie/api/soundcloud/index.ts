import {
	SearchPayload,
	SearchResponse,
	GetUserResponse,
	GetUserPlaylistsResponse,
	GetRepostsPayload,
	GetRepostsResponse,
	GetLikesPayload,
	GetLikesResponse,
	GetPlaylistResponse,
	GetTrackResponse,
	GetTracksResponse,
	GetMediaResponse
} from '@/api/soundcloud/types';
import { paramify } from '@/util/api';
import { API } from '@/constants';

import Request from '@/shared/Request';

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

export function getReposts(userId: number, options: GetRepostsPayload): Promise<GetRepostsResponse> {
	return Request.get<GetRepostsResponse>(
		API.SoundCloud.BASE_URL + `/stream/users/${userId}${paramify({ ...options, ...defaultParams })}`
	);
}

export function getLikes(userId: number, options: GetLikesPayload): Promise<GetLikesResponse> {
	return Request.get<GetLikesResponse>(
		API.SoundCloud.BASE_URL + `/users/${userId}/likes${paramify({ ...options, ...defaultParams })}`
	);
}

export function getPlaylist(id: number): Promise<GetPlaylistResponse> {
	return Request.get<GetPlaylistResponse>(API.SoundCloud.BASE_URL + `/playlists/${id}${paramify(defaultParams)}`);
}

export function getTrack(id: number): Promise<GetTrackResponse> {
	return Request.get<GetTrackResponse>(API.SoundCloud.BASE_URL + `/tracks/${id}${paramify(defaultParams)}`);
}

export async function getTracks(ids: number[]): Promise<GetTracksResponse> {
	const tracks = await Request.get<GetTracksResponse>(
		API.SoundCloud.BASE_URL + `/tracks${paramify({ ids: ids.join(','), ...defaultParams })}`
	);

	return tracks.sort((a, b) => {
		const indexA = ids.indexOf(a.id);
		const indexB = ids.indexOf(b.id);

		if (indexA === -1) return 1;
		if (indexB === -1) return -1;

		return indexA - indexB;
	});
}

export function getMedia(url: string): Promise<GetMediaResponse> {
	return Request.get<GetMediaResponse>(`${url}${paramify(defaultParams)}`);
}
