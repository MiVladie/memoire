import React from 'react';

import { EPlaylistType } from 'interfaces/data';

import { ReactComponent as SoundCloud } from 'assets/icons/soundcloud.svg';
import { ReactComponent as YouTube } from 'assets/icons/youtube.svg';

import { ReactComponent as Repeat } from 'assets/icons/repeat.svg';
import { ReactComponent as Heart } from 'assets/icons/heart.svg';
import { ReactComponent as Note } from 'assets/icons/note.svg';

interface ITheme {
	icon: React.ReactNode;
	color: string;
}

export function themePlatform(id: number): ITheme {
	switch (id) {
		case 1:
			return { icon: <SoundCloud />, color: '#FF7500' };

		case 2:
			return { icon: <YouTube />, color: '#FF0000' };

		default:
			return { icon: <YouTube />, color: '#FF0000' };
	}
}

export function themePlaylist(type: EPlaylistType): ITheme {
	switch (type) {
		case EPlaylistType.REPOST:
			return { icon: <Repeat />, color: '#88E788' };

		case EPlaylistType.LIKE:
			return { icon: <Heart />, color: '#966FD6' };

		default:
			return { icon: <Note />, color: '#FEC9A7' };
	}
}
