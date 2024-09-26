import { User } from './models';

export interface AuthStorage {
	user: User;
	token: string;
}
