import { UserDTO, UserTokenDTO } from '@/dtos/user/types';
import { User } from '@/interfaces/models';
import { excludeKeys } from '@/util/optimization';
import { File, Server } from '@/constants';

import path from 'path';

export function toUserDTO(user: User): UserDTO {
	user.image = user.image ? Server.URL + path.join(File.PUBLIC_PATH, File.IMAGES_PATH, user.image) : null;

	return excludeKeys(user, ['password', 'createdAt']);
}

export function toUserTokenDTO(user: User): UserTokenDTO {
	return { id: user.id };
}
