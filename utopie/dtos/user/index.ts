import { UserDTO, UserTokenDTO } from '@/dtos/user/types';
import { User } from '@/interfaces/models';
import { excludeKeys } from '@/util/optimization';
import { Path } from '@/constants';

import path from 'path';

export function toUserDTO(user: User): UserDTO {
	user.image = user.image ? Path.BASE_URL + path.join(Path.Shared.images, user.image) : null;

	return excludeKeys(user, ['password', 'createdAt']);
}

export function toUserTokenDTO(user: User): UserTokenDTO {
	return { id: user.id };
}
