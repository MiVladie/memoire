import { User } from '@/interfaces/models';

export interface FindOneParams extends Partial<User> {}

export interface CreateParams {
	name: string;
	email: string;
	password: string;
}
