import { Song } from '@/interfaces/models';
import { CreateSongDTO, SongDTO } from '@/dtos/song/types';
import { SoundCloudCollection, SoundCloudTrack } from '@/interfaces/soundcloud';
import { Platform } from '@/constants';

export function toSongsDTO(songs: Song[]): SongDTO[] {
	return songs;
}

export function fromSoundCloudCollectionDTO(collection: SoundCloudCollection) {
	return collection
		.filter((item) => !!item.track)
		.map(({ track }) => ({
			name: track.title || '',
			author: track.user?.username || '',
			duration: Math.floor(track.full_duration / 1000),
			image: track.artwork_url,
			isPresent: true,
			url: track.permalink_url,
			platformId: Platform.SoundCloud.id,

			soundcloudId: track.id
		}));
}

export function fromSoundCloudTracksDTO(tracks: SoundCloudTrack[]) {
	return tracks.map((track) => ({
		name: track.title || '',
		author: track.user.username || '',
		duration: Math.floor(track.full_duration / 1000),
		image: track.artwork_url,
		isPresent: true,
		url: track.permalink_url,
		platformId: Platform.SoundCloud.id,

		soundcloudId: track.id
	}));
}
