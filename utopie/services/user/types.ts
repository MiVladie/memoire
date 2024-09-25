import { UserDTO } from '@/dtos/user/types';

export interface UpdateParams {
	name?: string;
}

export interface UpdateType {
	user: UserDTO;
}
