import { GetParams, GetType } from './types';
import { toPlaylistsDTO } from '@/dtos/playlist';

import * as playlistRepository from '@/repositories/playlist';

export async function get(params: GetParams): Promise<GetType> {
	const playlists = await playlistRepository.findMany({
		userId: params.userId,
		platformId: params.platformId
	});

	return {
		playlists: toPlaylistsDTO(playlists)
	};
}
