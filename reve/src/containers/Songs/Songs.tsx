import React from 'react';

import { Song as ISong } from 'interfaces/models';

import Song from 'components/Song/Song';
import SongSkeleton from 'components/Song/Skeleton';

import placeholder from 'assets/images/song_placeholder.jpg';

import classes from './Songs.module.scss';

const SKELETON_SIZE = 12;

interface Props {
	data: ISong[];
	loading?: boolean;
	className?: string;
}

const Songs = ({ data, loading, className }: Props) => (
	<ul className={[classes.Songs, className].join(' ')}>
		{data.length
			? data.map((song) => (
					<Song
						id={song.id}
						className={classes.Song}
						image={song.image || placeholder}
						name={song.name}
						author={song.author}
						url={song.url}
						duration={song.duration}
						is_present={song.isPresent}
						key={song.id}
					/>
			  ))
			: null}

		{loading &&
			new Array(SKELETON_SIZE).fill(null).map((_, i) => <SongSkeleton className={classes.Song} key={i} />)}

		{!data.length && !loading ? (
			<p className={classes.Empty}>
				for now, the stars are hidden behind the clouds
				<br />
				<br />
				..but the sky won't stay empty for long ✨ 🪐
			</p>
		) : null}
	</ul>
);

export default Songs;
