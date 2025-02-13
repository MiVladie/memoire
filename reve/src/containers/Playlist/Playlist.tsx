import React, { useEffect } from 'react';

import { ISong } from 'interfaces/data';
import { convertSecondsToFormat } from 'util/date';

import { ReactComponent as Play } from 'assets/icons/play.svg';
import { ReactComponent as Stop } from 'assets/icons/stop.svg';
import { ReactComponent as Note } from 'assets/icons/note.svg';
import { ReactComponent as Hide } from 'assets/icons/hide.svg';
import { ReactComponent as Clock } from 'assets/icons/clock.svg';
import { ReactComponent as Queue } from 'assets/icons/queue.svg';
import { ReactComponent as Url } from 'assets/icons/url.svg';

import Skeleton from 'components/Skeleton/Skeleton';
import Knob from 'components/Knob/Knob';
import Content from 'containers/Content/Content';
import useScroll from 'hooks/useScroll';

import classes from './Playlist.module.scss';

const SKELETON_SIZE = 10;

interface Props {
	name: string;
	icon: React.ReactNode;
	color: string;
	total: number;
	removed: number;
	date: Date;
	onPlay?: () => void;
	onStop?: () => void;
	onQueue?: (id: number) => void;
	onScrollEnd?: () => void;
	playing: boolean;
	songs: ISong[];
	className?: string;
	loading?: boolean;
	fetching?: boolean;
}

const Playlist = ({
	name,
	icon,
	color,
	total,
	removed,
	date,
	onPlay,
	onStop,
	onQueue,
	onScrollEnd,
	playing,
	songs,
	className,
	loading,
	fetching
}: Props) => {
	const { element, resetHandler } = useScroll({ offset: 300, onCross: onScrollEnd });

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

					<p className={classes.Value}>{total}</p>
					<p className={classes.Label}>songs</p>
				</li>

				<li className={classes.Stat}>
					<Hide className={classes.Icon} />

					<p className={classes.Value}>{removed}</p>
					<p className={classes.Label}>removed</p>
				</li>

				<li className={classes.Stat}>
					<Clock className={classes.Icon} />

					<p className={classes.Value}>
						{new Date(date).toLocaleTimeString('default', { timeStyle: 'short' })}
					</p>
				</li>
			</ul>
		</div>
	);

	const skeleton = new Array(SKELETON_SIZE).fill(null).map((_, i) => (
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

	useEffect(() => {
		if (fetching) {
			return;
		}

		resetHandler();
	}, [fetching]);

	return (
		<>
			<Content
				title={name}
				icon={icon}
				color={color}
				meta={stats}
				className={className}
				style={loading ? { display: 'none' } : undefined}
				scrollRef={element}>
				<ul className={classes.Songs}>
					{!fetching || songs.length ? (
						<>
							{songs.map((song) => (
								<li className={classes.Song} key={song.id}>
									<div className={classes.Wrapper}>
										<img src={song.image!} alt={song.name} className={classes.Image} />

										<div className={classes.Info}>
											<p
												className={[
													classes.Title,
													!song.is_present && classes.TitleMissing
												].join(' ')}>
												{song.name}
											</p>

											<p className={classes.Author}>{song.author}</p>
										</div>
									</div>

									<div className={classes.Extra}>
										<div className={classes.Actions}>
											<Knob
												icon={<Queue />}
												onClick={() => onQueue?.(song.id)}
												className={!song.is_present ? classes.QueueHidden : ''}
											/>

											<Knob
												icon={<Url />}
												onClick={() => linkHandler(song.url)}
												className={classes.Url}
											/>
										</div>

										<p className={classes.Duration}>{convertSecondsToFormat(song.duration)}</p>
									</div>
								</li>
							))}

							{fetching && skeleton}
						</>
					) : (
						skeleton
					)}
				</ul>
			</Content>

			{loading && <Skeleton className={className} />}
		</>
	);
};

export default Playlist;
