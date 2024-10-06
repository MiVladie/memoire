import { Playlist } from '@/interfaces/models';
import { PlaylistDTO, CreatePlaylistDTO } from '@/dtos/playlist/types';
import { SoundCloudPlaylist } from '@/interfaces/soundcloud';
import { PLATFORMS } from '@/constants/db';

export function toPlaylistsDTO(playlists: Playlist[]): PlaylistDTO[] {
	return playlists;
}

export function fromSoundCloudPlaylistsDTO(playlists: SoundCloudPlaylist[]): Omit<CreatePlaylistDTO, 'userId'>[] {
	return playlists.map((playlist) => ({
		name: playlist.title,
		platformId: PLATFORMS.SoundCloud.id,
		soundcloudId: playlist.id
	}));
}
