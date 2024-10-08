import { PLATFORMS } from '@/constants/db';
import { CreatePlaylistDTO } from '@/dtos/playlist/types';
import { SoundCloudPlaylistType } from '@/interfaces/soundcloud';

export const SOUNDCLOUD_DEFAULT_PLAYLISTS: Omit<CreatePlaylistDTO, 'userId'>[] = [
	{
		name: 'Reposts',
		platformId: PLATFORMS.SoundCloud.id,
		type: SoundCloudPlaylistType.REPOSTS
	},
	{
		name: 'Likes',
		platformId: PLATFORMS.SoundCloud.id,
		type: SoundCloudPlaylistType.LIKES
	}
];
