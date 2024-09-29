import { User } from '@prisma/client';

export interface FindOneParams extends Partial<User> {}

export interface CreateParams {
	name: string;
	email: string;
	password: string;
}

export interface UpdateParams {
	name?: string;
	password?: string;
	image?: string | null;
}
