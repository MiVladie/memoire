import React from 'react';

import { Song as ISong } from 'interfaces/models';

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
		{!loading ? (
			data.length ? (
				data.map((song) => (
					<Song
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
			) : (
				<p className={classes.Empty}>
					for now, the stars are hidden behind the clouds
					<br />
					<br />
					..but the sky won't stay empty for long ✨ 🪐
				</p>
			)
		) : (
			new Array(SKELETON_SIZE).fill(null).map((_, i) => <SongSkeleton className={classes.Song} key={i} />)
		)}
	</ul>
);

export default Songs;
