import { UserDTO, UserTokenDTO } from '@/dtos/user/types';
import { User } from '@/interfaces/models';
import { excludeKeys } from '@/util/optimization';

import { File, Server } from '@/constants';

export function toUserDTO(user: User): UserDTO {
	user.image = Server.URL + File.PUBLIC_PATH + File.IMAGES_PATH + user.image;

	return excludeKeys(user, ['password', 'createdAt']);
}

export function toUserTokenDTO(user: User): UserTokenDTO {
	return { id: user.id };
}
