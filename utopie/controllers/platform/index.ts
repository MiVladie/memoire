import { GetHandler } from './types';

import * as platformService from '@/services/platform';

export const get: GetHandler = async (req, res, next) => {
	const { platforms } = await platformService.get();

	res.status(200).json({
		platforms,
		message: 'Platforms retrieved successfully!'
	});
};
