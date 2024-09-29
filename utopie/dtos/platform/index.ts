import { PlatformDTO } from '@/dtos/platform/types';
import { Platform } from '@/interfaces/models';

export function toPlatformsDTO(platforms: Platform[]): PlatformDTO[] {
	return platforms;
}
