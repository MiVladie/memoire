import { SoundCloudPlaylistType } from '@/interfaces/soundcloud';

export const SoundCloud = {
	id: 1,
	name: 'SoundCloud',
	theme: '#FF7700',
	playlists: [
		{
			name: 'Reposts',
			type: SoundCloudPlaylistType.REPOSTS
		},
		{
			name: 'Likes',
			type: SoundCloudPlaylistType.LIKES
		}
	]
};

export const YouTube = {
	id: 2,
	name: 'YouTube',
	theme: '#FF0000'
};
