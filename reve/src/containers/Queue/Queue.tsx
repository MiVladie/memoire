import React from 'react';

import { ISong } from 'interfaces/data';
import { useQueue } from 'context/useQueue';
import { convertSecondsToFormat } from 'util/date';

import useScreen from 'hooks/useScreen';

import { ReactComponent as Play } from 'assets/icons/play.svg';
import { ReactComponent as Pause } from 'assets/icons/pause.svg';
import { ReactComponent as MusicQueue } from 'assets/icons/queue.svg';

import Knob from 'components/Knob/Knob';

import classes from './Queue.module.scss';

interface Props {
	current: ISong;
	list: ISong[];
	visible?: boolean;
	className?: string;
}

const Queue = ({ current, list, visible, className }: Props) => {
	const { state, play } = useQueue();

	const { isDesktop } = useScreen();

	function queueHandler(id: number) {
		//
	}

	return (
		<div className={[classes.Queue, visible ? classes.QueueVisible : '', className].join(' ')}>
			<div className={classes.Header}>
				<img src={current.image!} alt={current.name} className={classes.Background} />

				<div className={classes.Gradient} />

				<div className={classes.Current}>
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

			<ul className={classes.Songs}>
				{list.map((song) => (
					<li className={classes.Song} key={song.id}>
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
