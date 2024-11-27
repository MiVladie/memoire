import { GetMediaParams, GetMediaType } from './types';
import { Platform } from '@/constants';

import APIError, { Errors } from '@/shared/APIError';

import * as soundCloudService from '@/services/soundcloud';
import * as songRepository from '@/repositories/song';

export async function getMedia(params: GetMediaParams): Promise<GetMediaType> {
	const song = await songRepository.findOne({ id: params.id });

	if (!song) {
		throw new APIError(Errors.INTERNAL_SERVER_ERROR);
	}

	if (!song.isPresent) {
		throw new APIError(Errors.NOT_FOUND, { message: 'Cannot listen to a song that is not present!' });
	}

	switch (song.platformId) {
		case Platform.SoundCloud.id:
			const {
				song: { media }
			} = await soundCloudService.getTrack({ id: song.soundcloudSong!.soundcloudTrackId });

			return { media };

		default:
			throw new APIError(Errors.INTERNAL_SERVER_ERROR);
	}
}
