import { PlaylistDTO } from '@/dtos/playlist/types';
import { Playlist } from '@/interfaces/models';

export function toPlaylistsDTO(playlists: Playlist[]): PlaylistDTO[] {
	return playlists;
}
