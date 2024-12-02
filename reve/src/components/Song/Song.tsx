import React, { useContext, useMemo, useState } from 'react';

import { convertSecondsToFormat } from 'utils/date';
import { QueueContext } from 'context/providers/queue';

import Knob from 'components/Knob/Knob';

import { ReactComponent as Url } from 'assets/icons/url.svg';
import { ReactComponent as Play } from 'assets/icons/play.svg';
import { ReactComponent as Pause } from 'assets/icons/pause.svg';

import * as API from 'apis';

import classes from './Song.module.scss';

interface Props {
	id: number;
	className?: string;
	image: string;
	name: string;
	author: string;
	url: string;
	duration: number;
	is_present: boolean;
}

const Song = ({ id, className, image, name, author, url, duration, is_present }: Props) => {
	const { state, ...QueueStore } = useContext(QueueContext);

	const active = useMemo(() => state.currentId === id, [state.currentId]);

	function playHandler() {
		if (!is_present) {
			return;
		}

		if (!active) {
			QueueStore.load([{ id, image, name, author, url, duration, is_present }]);

			return;
		}

		if (state.playing) {
			QueueStore.pause();

			return;
		}

		QueueStore.play();
	}

	function openLink() {
		if (typeof window != undefined) {
			window.open(url, '_blank')!.focus();
		}
	}

	return (
		<li className={[classes.Song, className].join(' ')}>
			<div className={classes.Wrapper}>
				<div
					className={[
						classes.Media,
						is_present ? classes.MediaPresent : '',
						active ? classes.MediaActive : ''
					].join(' ')}
					onClick={playHandler}>
					<img className={classes.Image} src={image} alt={name} />

					{is_present && (
						<Knob icon={active && state.playing ? <Pause /> : <Play />} className={classes.Play} />
					)}
				</div>

				<div className={classes.Info}>
					<h2 className={[classes.Name, !is_present && classes.NameAbsent].join(' ')}>{name}</h2>
					<h3 className={classes.Author}>{author}</h3>
				</div>
			</div>

			<div className={classes.Link}>
				<Url onClick={openLink} />
			</div>

			<p className={classes.Duration}>{convertSecondsToFormat(duration)}</p>
		</li>
	);
};

export default Song;
