import { User } from './models';

export interface AuthStorage {
	user: User | null;
	token: string | null;
}
