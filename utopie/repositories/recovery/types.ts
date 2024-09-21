import { Recovery } from '@/interfaces/models';

export interface FindOneParams extends Partial<Recovery> {}

export interface CreateParams {
	code: string;
	expiresAt: Date;
	userId: number;
}

export interface RemoveParams {
	id: number;
}
