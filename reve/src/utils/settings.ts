import { PLATFORMS } from 'constants/settings';
import { User } from 'interfaces/models';

export function isLinked(platformId: number, user: User): boolean {
	switch (platformId) {
		case PLATFORMS.SoundCloud.id:
			return !!user.soundcloudId;

		default:
			return false;
	}
}
