import { Playlist } from '@/interfaces/models';
import { PlaylistDTO, CreatePlaylistDTO } from '@/dtos/playlist/types';
import { SoundCloudPlaylist } from '@/interfaces/soundcloud';
import { Platform } from '@/constants';

export function toPlaylistsDTO(playlists: Playlist[]): PlaylistDTO[] {
	return playlists.map((playlist) => ({
		id: playlist.id,
		name: playlist.name,
		type: playlist.type,
		total_songs: playlist.total_songs,
		removed_songs: playlist.removed_songs,
		date_updated: playlist.date_updated
	}));
}

export function fromSoundCloudPlaylistsDTO(
	playlists: SoundCloudPlaylist[]
): Omit<CreatePlaylistDTO, 'userId' | 'type'>[] {
	return playlists.map((playlist) => ({
		name: playlist.title,
		platformId: Platform.SoundCloud.id,
		soundcloudId: playlist.id
	}));
}
