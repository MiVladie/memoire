import React from 'react';

import { ISong } from 'interfaces/data';

import Song from 'components/Song/Song';

import placeholder from 'assets/images/song_placeholder.jpg';

import * as classes from './Songs.module.scss';

interface Props {
	data: ISong[];
	className?: string;
}

const Songs = ({ data, className }: Props) => {
	return (
		<ul className={[classes.Songs, className].join(' ')}>
			{[...data, ...data].map((song) => (
				<Song
					className={classes.Song}
					image={song.image || placeholder}
					name={song.name}
					author={song.author}
					url={song.url}
					duration={song.duration}
					is_present={song.is_present}
					key={song.id}
				/>
			))}
		</ul>
	);
};

export default Songs;
