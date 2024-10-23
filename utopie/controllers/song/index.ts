import { GetMediaHandler } from './types';

import * as songService from '@/services/song';

export const getMedia: GetMediaHandler = async (req, res, next) => {
	const { id } = req.params;

	const { media } = await songService.getMedia({ id: parseInt(id) });

	res.status(200).json({
		media,
		message: 'Media retrieved successfully!'
	});
};
