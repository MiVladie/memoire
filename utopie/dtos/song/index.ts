import { SongDTO } from '@/dtos/song/types';
import { Song } from '@/interfaces/models';

export function toSongsDTO(songs: Song[]): SongDTO[] {
	return songs;
}
