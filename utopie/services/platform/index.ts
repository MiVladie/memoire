import { GetType } from './types';
import { toPlatformsDTO } from '@/dtos/platform';

import * as platformRepository from '@/repositories/platform';

export async function get(): Promise<GetType> {
	const platforms = await platformRepository.findMany();

	return {
		platforms: toPlatformsDTO(platforms)
	};
}
