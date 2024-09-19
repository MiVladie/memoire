import { UserDTO, UserTokenDTO } from '@/dtos/user/types';
import { User } from '@/interfaces/models';
import { excludeKeys } from '@/util/optimization';

export function toUserDTO(user: User): UserDTO {
	return excludeKeys(user, ['password', 'createdAt']);
}

export function toUserTokenDTO(user: User): UserTokenDTO {
	return { id: user.id };
}
