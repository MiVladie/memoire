import React, { useEffect, useRef, useState } from 'react';

import { QueueActions, useQueue } from 'context/useQueue';
import { convertSecondsToFormat } from 'util/date';
import { useNavigation } from 'context/useNavigation';
import { Song } from 'interfaces/models';
import { clsx } from 'util/style';

import { ReactComponent as Play } from 'assets/icons/play.svg';
import { ReactComponent as Pause } from 'assets/icons/pause.svg';
import { ReactComponent as QueueRemove } from 'assets/icons/queue_remove.svg';

import Skeleton from 'components/Skeleton/Skeleton';
import Knob from 'components/Knob/Knob';
import useScreen from 'hooks/useScreen';
import useScroll from 'hooks/useScroll';

import classes from './Queue.module.scss';

const SKELETON_SIZE = 10;

const PADDING_SPACE = 16;
const QUEUE_WIDTH = 350;

interface Props {
	className?: string;
	loading?: boolean;
}

const Queue = ({ className, loading }: Props) => {
	const [song, setSong] = useState<Song>();

	const { state, subscribe, retrieve, play, remove } = useQueue();
	const {
		state: { queueVisible },
		activateQueue
	} = useNavigation();

	const { isMobile, isTablet, isDesktop } = useScreen();
	const { element, resetCrossHandler } = useScroll({
		crossOffset: 300,
		onCross: fetchData,
		onScroll: resizeHandler,
		active: !loading && isDesktop
	});

	const headerRef = useRef<HTMLDivElement>(null);
	const infoRef = useRef<HTMLDivElement>(null);
	const songRef = useRef<HTMLLIElement>(null);

	useEffect(() => {
		const unsubscribe = subscribe((action, newState) => {
			switch (action) {
				case QueueActions.START_PLAYLIST:
					setSong(newState.list[newState.playingIndex!]);
					break;

				case QueueActions.PLAY_SONG:
					setSong(newState.list[newState.playingIndex!]);
					break;

				case QueueActions.NEXT_SONG:
					setSong(newState.list[newState.playingIndex!]);
					break;

				case QueueActions.PREVIOUS_SONG:
					setSong(newState.list[newState.playingIndex!]);
					break;

				default:
					break;
			}
		});

		return unsubscribe;
	}, []);

	async function fetchData() {
		await retrieve();

		resetCrossHandler();
	}

	function resizeHandler() {
		const scrollTop = element.current!.scrollTop;
		const infoHeight = infoRef.current!.clientHeight;

		const initialHeight =
			(isMobile ? window.innerWidth : isTablet ? window.innerHeight * 0.4 : QUEUE_WIDTH) - PADDING_SPACE * 2;
		const minHeight = infoHeight + PADDING_SPACE * 2;

		const newHeight = Math.max(initialHeight - scrollTop, minHeight);
		const padding = Math.min(scrollTop, initialHeight - minHeight);

		headerRef.current!.style.height = `${newHeight}px`;
		element.current!.style.paddingTop = `${padding}px`;
	}

	function playHandler(index: number) {
		// Resume/pause song
		if (index === state.playingIndex) {
			play();

			return;
		}

		play({ playlistId: state.playlistId!, songId: state.list[index].id });
	}

	function unqueueSongHandler(index: number) {
		if (state.list.length === 1) {
			stop();

			activateQueue(false);
		}

		remove(index);
	}

	if (loading) {
		return <Skeleton className={clsx(classes.Queue, { [classes.QueueVisible]: queueVisible }, className)} />;
	}

	return (
		<div className={clsx(classes.Queue, { [classes.QueueVisible]: queueVisible }, className)}>
			<div className={classes.Header} ref={headerRef}>
				{song ? (
					<img src={song.image!} alt={song.name} className={classes.Background} />
				) : (
					<Skeleton className={classes.Background} />
				)}

				<div className={classes.Gradient} />

				<div className={classes.Current} ref={infoRef}>
					{song ? (
						<div className={classes.Wrapper}>
							<h2 className={classes.Title}>{song.name}</h2>
							<h3 className={classes.Author}>{song.author}</h3>
						</div>
					) : (
						<div className={classes.Wrapper}>
							<Skeleton className={classes.Title} width={100} light />
							<Skeleton className={classes.Author} width={50} light />
						</div>
					)}

					<Knob
						icon={!state.playing ? <Play /> : <Pause />}
						onClick={play}
						className={classes.Action}
						size={isDesktop ? 36 : 48}
						fill
					/>
				</div>
			</div>

			<ul className={classes.Songs} ref={element}>
				{state.list.map((song, i) => (
					<li className={classes.Song} key={song.id + i.toString()} ref={i === 0 ? songRef : undefined}>
						<div className={classes.Info}>
							<div
								className={clsx(classes.Media, { [classes.MediaActive]: state.playingIndex === i })}
								onClick={() => playHandler(i)}>
								<img src={song.image!} alt={song.name} className={classes.Image} />

								<Knob
									icon={state.playing && i === state.playingIndex ? <Pause /> : <Play />}
									className={classes.Play}
								/>
							</div>

							<div className={classes.Meta}>
								<p className={classes.Title}>{song.name}</p>

								<p className={classes.Author}>{song.author}</p>
							</div>
						</div>

						<div className={classes.Actions}>
							<Knob
								icon={<QueueRemove />}
								onClick={() => unqueueSongHandler(i)}
								className={classes.QueueRemove}
							/>
						</div>

						<p className={classes.Duration}>{convertSecondsToFormat(song.duration)}</p>
					</li>
				))}

				{state.retrieving && SKELETON}
			</ul>
		</div>
	);
};

export default Queue;

const SKELETON = new Array(SKELETON_SIZE).fill(null).map((_, i) => (
	<li className={classes.Song} key={i}>
		<div className={classes.Info}>
			<Skeleton className={classes.Image} light />

			<div className={classes.Meta}>
				<Skeleton className={classes.Title} width={100} light />

				<Skeleton className={classes.Author} width={75} light />
			</div>
		</div>

		<Skeleton className={classes.Duration} light />
	</li>
));
