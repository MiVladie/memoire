import React, { useEffect, useMemo } from 'react';

import { Playlist, Song } from 'interfaces/models';
import { convertSecondsToFormat } from 'util/date';
import { themePlaylist } from 'util/visuals';

import { ReactComponent as Play } from 'assets/icons/play.svg';
import { ReactComponent as Stop } from 'assets/icons/stop.svg';
import { ReactComponent as Note } from 'assets/icons/note.svg';
import { ReactComponent as Hide } from 'assets/icons/hide.svg';
import { ReactComponent as Clock } from 'assets/icons/clock.svg';
import { ReactComponent as QueueAdd } from 'assets/icons/queue_add.svg';
import { ReactComponent as Url } from 'assets/icons/url.svg';

import Skeleton from 'components/Skeleton/Skeleton';
import Knob from 'components/Knob/Knob';
import Content from 'containers/Content/Content';
import useScroll from 'hooks/useScroll';

import classes from './Playlist.module.scss';

const SKELETON_SIZE = 10;

interface Props {
	data?: Playlist;
	onPlay?: () => void;
	onStop?: () => void;
	onQueueAdd?: (song: Song) => void;
	onScrollEnd?: () => void;
	playing: boolean;
	songs: Song[];
	endReached?: boolean;
	loading?: boolean;
	fetching?: boolean;
	className?: string;
}

const PlaylistContainer = ({
	data,
	onPlay,
	onStop,
	onQueueAdd,
	onScrollEnd,
	playing,
	songs,
	endReached,
	loading,
	fetching,
	className
}: Props) => {
	const { element, resetCrossHandler } = useScroll({
		crossOffset: 300,
		onCross: onScrollEnd,
		active: !loading && !fetching && !endReached
	});

	useEffect(() => {
		if (fetching) {
			return;
		}

		resetCrossHandler();
	}, [fetching]);

	function linkHandler(url: string) {
		window.open(url, '_blank')!.focus();
	}

	const stats = (
		<div className={classes.Meta}>
			<Knob
				icon={!playing ? <Play /> : <Stop />}
				onClick={!playing ? onPlay : onStop}
				size={48}
				className={classes.Play}
				fill
			/>

			<ul className={classes.Stats}>
				<li className={classes.Stat}>
					<Note className={classes.Icon} />

					<p className={classes.Value}>{data?.total_songs}</p>
					<p className={classes.Label}>songs</p>
				</li>

				<li className={classes.Stat}>
					<Hide className={classes.Icon} />

					<p className={classes.Value}>{data?.removed_songs}</p>
					<p className={classes.Label}>removed</p>
				</li>

				<li className={classes.Stat}>
					<Clock className={classes.Icon} />

					<p className={classes.Value}>
						{new Date(data?.date_updated ?? 0).toLocaleTimeString('default', { timeStyle: 'short' })}
					</p>
				</li>
			</ul>
		</div>
	);

	const { icon, color } = useMemo(() => themePlaylist(data?.type), [data]);

	if (loading) {
		return <Skeleton className={className} />;
	}

	return (
		<Content
			title={data?.name || ''}
			icon={icon}
			color={color}
			meta={stats}
			className={className}
			scrollRef={element}>
			<ul className={classes.Songs}>
				{songs.map((song) => (
					<li className={classes.Song} key={song.id}>
						<div className={classes.Wrapper}>
							<img src={song.image!} alt={song.name} className={classes.Image} />

							<div className={classes.Info}>
								<p className={[classes.Title, !song.isPresent && classes.TitleMissing].join(' ')}>
									{song.name}
								</p>

								<p className={classes.Author}>{song.author}</p>
							</div>
						</div>

						<div className={classes.Extra}>
							<div className={classes.Actions}>
								<Knob
									icon={<QueueAdd />}
									onClick={() => onQueueAdd?.(song)}
									className={!song.isPresent ? classes.QueueHidden : ''}
								/>

								<Knob icon={<Url />} onClick={() => linkHandler(song.url)} className={classes.Url} />
							</div>

							<p className={classes.Duration}>{convertSecondsToFormat(song.duration)}</p>
						</div>
					</li>
				))}

				{fetching && SKELETON}
			</ul>
		</Content>
	);
};

export default PlaylistContainer;

const SKELETON = new Array(SKELETON_SIZE).fill(null).map((_, i) => (
	<li className={classes.Song} key={i}>
		<div className={classes.Wrapper}>
			<Skeleton className={classes.Image} light />

			<div className={classes.Info}>
				<Skeleton className={classes.Title} light />

				<Skeleton className={classes.Author} light />
			</div>
		</div>

		<div className={classes.Extra}>
			<div />

			<Skeleton className={classes.Duration} width={60} light />
		</div>
	</li>
));
