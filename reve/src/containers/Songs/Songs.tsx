import React from 'react';

import { ISong } from 'interfaces/data';

import Song from 'components/Song/Song';
import SongSkeleton from 'components/Song/Skeleton';

import placeholder from 'assets/images/song_placeholder.jpg';

import * as classes from './Songs.module.scss';

const SKELETON_SIZE = 12;

interface Props {
	data: ISong[];
	loading?: boolean;
	className?: string;
}

const Songs = ({ data, loading, className }: Props) => (
	<ul className={[classes.Songs, className].join(' ')}>
		{!loading
			? [...data, ...data].map((song) => (
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
			  ))
			: new Array(SKELETON_SIZE).fill(null).map((_, i) => <SongSkeleton className={classes.Song} key={i} />)}
	</ul>
);

export default Songs;
