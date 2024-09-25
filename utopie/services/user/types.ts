import { UserDTO } from '@/dtos/user/types';

export interface UpdateParams {
	name?: string;
}

export interface UpdatePasswordParams {
	password: string;
	newPassword: string;
}

export interface UpdateType {
	user: UserDTO;
}
