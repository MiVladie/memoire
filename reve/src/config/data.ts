import { IPlatform } from 'interfaces/data';

export const PLATFORMS_DATA: IPlatform[] = [
	{
		id: 1,
		name: 'SoundCloud',
		theme_color: '#FF7700',
		playlists: [
			{
				id: 1,
				name: 'Reposts'
			},
			{
				id: 2,
				name: 'Likes'
			},
			{
				id: 3,
				name: 'Lo-Fi'
			},
			{
				id: 4,
				name: 'For Chill'
			},
			{
				id: 5,
				name: 'Upbeat'
			}
		]
	},
	{
		id: 2,
		name: 'YouTube',
		theme_color: '#FF0000',
		playlists: [
			{
				id: 1,
				name: 'Liked music'
			},
			{
				id: 2,
				name: 'Para el Carro` 🔥'
			}
		]
	},
	{
		id: 3,
		name: 'Spotify',
		theme_color: '#1DB954',
		playlists: [
			{
				id: 1,
				name: 'Likes'
			},
			{
				id: 2,
				name: 'wow bangers'
			}
		]
	},
	{
		id: 4,
		name: 'Apple Music',
		theme_color: '#FC3C44',
		playlists: [
			{
				id: 1,
				name: 'nice ones'
			},
			{
				id: 2,
				name: 'pop songs'
			}
		]
	}
];

export const PLAYLIST_DATA = {
	songs: [
		{
			id: 1,
			image: 'https://images.pexels.com/photos/14424034/pexels-photo-14424034.jpeg',
			name: 'that includes you',
			author: 'nctrn',
			url: 'https://soundcloud.com/ncturne/that-includes-you',
			duration: 180,
			is_present: true
		},
		{
			id: 2,
			image: 'https://images.pexels.com/photos/14424034/pexels-photo-14424034.jpeg',
			name: '2 типа людей',
			author: 'Макс Корж',
			url: 'https://soundcloud.com/ncturne/that-includes-you',
			duration: 256,
			is_present: true
		},
		{
			id: 3,
			image: 'https://images.pexels.com/photos/14424034/pexels-photo-14424034.jpeg',
			name: 'Arthas Mode',
			author: 'Twinky',
			url: 'https://soundcloud.com/ncturne/that-includes-you',
			duration: 223,
			is_present: false
		},
		{
			id: 4,
			image: 'https://images.pexels.com/photos/14424034/pexels-photo-14424034.jpeg',
			name: "pretend we're okay",
			author: 'dj poolboi',
			url: 'https://soundcloud.com/ncturne/that-includes-you',
			duration: 230,
			is_present: false
		},
		{
			id: 5,
			image: 'https://images.pexels.com/photos/14424034/pexels-photo-14424034.jpeg',
			name: '2003',
			author: 'Liaze & equal',
			url: 'https://soundcloud.com/ncturne/that-includes-you',
			duration: 137,
			is_present: true
		},
		{
			id: 6,
			image: 'https://images.pexels.com/photos/14424034/pexels-photo-14424034.jpeg',
			name: 'Yxguden (feat. Bladee)',
			author: 'Evian Christ',
			url: 'https://soundcloud.com/ncturne/that-includes-you',
			duration: 267,
			is_present: true
		},
		{
			id: 7,
			image: 'https://images.pexels.com/photos/14424034/pexels-photo-14424034.jpeg',
			name: 'все забыть',
			author: 'наше последнее лето',
			url: 'https://soundcloud.com/ncturne/that-includes-you',
			duration: 132,
			is_present: false
		},
		{
			id: 8,
			image: 'https://images.pexels.com/photos/14424034/pexels-photo-14424034.jpeg',
			name: 'Alright (feat. Big Sean)',
			author: 'Logic',
			url: 'https://soundcloud.com/ncturne/that-includes-you',
			duration: 219,
			is_present: true
		}
	],
	pages: 4,
	total: 40
};
