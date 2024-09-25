import { UpdateParams, UpdateType } from './types';
import { toUserDTO } from '@/dtos/user';

import * as userRepository from '@/repositories/user';

export async function update(userId: number, { name }: UpdateParams): Promise<UpdateType> {
	const user = await userRepository.update(userId, { name });

	return {
		user: toUserDTO(user)
	};
}
