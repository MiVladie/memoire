import React from 'react';

import { ReactComponent as Person } from 'assets/icons/person.svg';
import { ReactComponent as Lock } from 'assets/icons/lock.svg';
import { ReactComponent as SoundCloud } from 'assets/icons/soundcloud.svg';
import { ReactComponent as YouTube } from 'assets/icons/youtube.svg';

export const PROJECT_NAME = 'Mémoire';
export const PROJECT_DESCRIPTION =
	'Mémoire is a project designed to keep track of listed & unlisted songs on music platforms of your choice';

export const SETTINGS_MENU = [
	{
		id: 1,
		icon: <Person />,
		color: '#8174A0',
		name: 'Profile'
	},
	{
		id: 2,
		icon: <Lock />,
		color: '#659287',
		name: 'Password'
	},
	{
		id: 3,
		icon: <SoundCloud />,
		color: '#FF7500',
		name: 'SoundCloud'
	},
	{
		id: 4,
		icon: <YouTube />,
		color: '#FF0000',
		name: 'YouTube'
	}
];
