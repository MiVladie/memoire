import React, { useEffect, useRef } from 'react';

import { ISong } from 'interfaces/data';
import { useQueue } from 'context/useQueue';
import { convertSecondsToFormat } from 'util/date';

import useScreen from 'hooks/useScreen';

import { ReactComponent as Play } from 'assets/icons/play.svg';
import { ReactComponent as Pause } from 'assets/icons/pause.svg';
import { ReactComponent as MusicQueue } from 'assets/icons/queue.svg';

import Knob from 'components/Knob/Knob';

import classes from './Queue.module.scss';

const PADDING_SPACE = 16;
const QUEUE_WIDTH = 350;

interface Props {
	current: ISong;
	list: ISong[];
	visible?: boolean;
	className?: string;
}

const Queue = ({ current, list, visible, className }: Props) => {
	const { state, play } = useQueue();

	const { isMobile, isTablet, isDesktop } = useScreen();

	const headerRef = useRef<HTMLDivElement>(null);
	const infoRef = useRef<HTMLDivElement>(null);
	const songsRef = useRef<HTMLUListElement>(null);
	const songRef = useRef<HTMLLIElement>(null);

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

		songsRef.current!.addEventListener('scroll', resize);

		return () => {
			songsRef.current!.removeEventListener('scroll', resize);
		};
	}, [visible, isDesktop]);

	function queueHandler(id: number) {
		//
	}

	return (
		<div className={[classes.Queue, visible ? classes.QueueVisible : '', className].join(' ')}>
			<div className={classes.Header} ref={headerRef}>
				<img src={current.image!} alt={current.name} className={classes.Background} />

				<div className={classes.Gradient} />

				<div className={classes.Current} ref={infoRef}>
					<div className={classes.Wrapper}>
						<h2 className={classes.Title}>{current.name}</h2>
						<h3 className={classes.Author}>{current.author}</h3>
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
				{list.map((song, i) => (
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
			</ul>
		</div>
	);
};

export default Queue;
