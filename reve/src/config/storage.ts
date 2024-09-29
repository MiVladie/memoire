import { AuthStorage, PlatformStorage } from 'interfaces/storage';

export const AUTH_STORAGE_KEYS: (keyof AuthStorage)[] = ['user', 'token'];
export const PLATFORM_STORAGE_KEYS: (keyof PlatformStorage)[] = ['platforms'];
