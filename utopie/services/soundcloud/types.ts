import { User } from '@/interfaces/soundcloud';

export interface GetUserParams {
	name: string;
}

export interface GetUserType {
	user: User;
}
