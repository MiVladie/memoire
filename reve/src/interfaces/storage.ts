import { Platform, User } from './models';

export interface AuthStorage {
	user: User;
	token: string;
}

export interface PlatformStorage {
	platforms: Platform[];
}
