import React, { useEffect, useMemo, useRef, useState } from 'react';

import { useQueue } from 'context/useQueue';
import { convertSecondsToFormat } from 'util/date';
import { ISong } from 'interfaces/data';

import useScreen from 'hooks/useScreen';

import { ReactComponent as Play } from 'assets/icons/play.svg';
import { ReactComponent as Pause } from 'assets/icons/pause.svg';
import { ReactComponent as MusicQueue } from 'assets/icons/queue.svg';

import Skeleton from 'components/Skeleton/Skeleton';
import Knob from 'components/Knob/Knob';

import classes from './Queue.module.scss';

const SKELETON_SIZE = 10;

const PADDING_SPACE = 16;
const QUEUE_WIDTH = 350;

const SAMPLE_SONG: ISong = {
	id: 1,
	image: null,
	name: 'Sample Song',
	author: 'Sample Author',
	url: '',
	duration: 0,
	is_present: true
};

interface Props {
	visible?: boolean;
	className?: string;
	loading?: boolean;
}

const Queue = ({ visible, className, loading }: Props) => {
	const [fetching, setFetching] = useState<boolean>(false);

	const { state, play } = useQueue();

	const { isMobile, isTablet, isDesktop } = useScreen();

	const headerRef = useRef<HTMLDivElement>(null);
	const infoRef = useRef<HTMLDivElement>(null);
	const songsRef = useRef<HTMLUListElement>(null);
	const songRef = useRef<HTMLLIElement>(null);

	const song = useMemo(
		() => (state.playingIndex !== null ? state.list[state.playingIndex] : SAMPLE_SONG),
		[state.list, state.playingIndex]
	);

	useEffect(() => {
		if (!visible && !isDesktop) {
			return;
		}

		function resize() {
			const scrollTop = songsRef.current!.scrollTop;
			const infoHeight = infoRef.current!.clientHeight;

			const initialHeight =
				(isMobile ? window.innerWidth : isTablet ? window.innerHeight * 0.4 : QUEUE_WIDTH) - PADDING_SPACE * 2;
			const minHeight = infoHeight + PADDING_SPACE * 2;

			const newHeight = Math.max(initialHeight - scrollTop, minHeight);
			const padding = Math.min(scrollTop, initialHeight - minHeight);

			headerRef.current!.style.height = `${newHeight}px`;
			songRef.current!.style.paddingTop = `${padding}px`;
		}

		songsRef.current?.addEventListener('scroll', resize);

		return () => {
			songsRef.current?.removeEventListener('scroll', resize);
		};
	}, [visible, isDesktop, loading]);

	function queueHandler(id: number) {
		//
	}

	if (loading) {
		return <Skeleton className={[classes.Queue, visible ? classes.QueueVisible : '', className].join(' ')} />;
	}

	const skeleton = new Array(SKELETON_SIZE).fill(null).map((_, i) => (
		<li className={classes.Song} key={i}>
			<div className={classes.Info}>
				<Skeleton className={classes.Image} light />

				<div className={classes.Meta}>
					<Skeleton className={classes.Title} light />

					<Skeleton className={classes.Author} light />
				</div>
			</div>

			<Skeleton className={classes.Duration} light />
		</li>
	));

	return (
		<div className={[classes.Queue, visible ? classes.QueueVisible : '', className].join(' ')}>
			<div className={classes.Header} ref={headerRef}>
				<img src={song.image!} alt={song.name} className={classes.Background} />

				<div className={classes.Gradient} />

				<div className={classes.Current} ref={infoRef}>
					<div className={classes.Wrapper}>
						<h2 className={classes.Title}>{song.name}</h2>
						<h3 className={classes.Author}>{song.author}</h3>
					</div>

					<Knob
						icon={!state.playing ? <Play /> : <Pause />}
						onClick={play}
						className={classes.Action}
						size={isDesktop ? 36 : 48}
						fill
					/>
				</div>
			</div>

			<ul className={classes.Songs} ref={songsRef}>
				{state.list.map((song, i) => (
					<li className={classes.Song} key={song.id} ref={i === 0 ? songRef : undefined}>
						<div className={classes.Info}>
							<img src={song.image!} alt={song.name} className={classes.Image} />

							<div className={classes.Meta}>
								<p className={classes.Title}>{song.name}</p>

								<p className={classes.Author}>{song.author}</p>
							</div>
						</div>

						<div className={classes.Actions}>
							<Knob
								icon={<MusicQueue />}
								onClick={() => queueHandler(song.id)}
								className={classes.MusicQueue}
							/>
						</div>

						<p className={classes.Duration}>{convertSecondsToFormat(song.duration)}</p>
					</li>
				))}

				{fetching && skeleton}
			</ul>
		</div>
	);
};

export default Queue;
