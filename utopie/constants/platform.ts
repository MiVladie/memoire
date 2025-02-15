import { PlaylistType } from '@/interfaces/models';

export const SoundCloud = {
	id: 1,
	name: 'SoundCloud',
	playlists: [
		{
			name: 'Reposts',
			type: PlaylistType.REPOSTS
		},
		{
			name: 'Likes',
			type: PlaylistType.LIKES
		}
	]
};

export const YouTube = {
	id: 2,
	name: 'YouTube'
};
