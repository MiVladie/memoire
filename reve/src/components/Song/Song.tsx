import React, { useState } from 'react';

import { convertSecondsToFormat } from 'utils/date';

import { ReactComponent as Url } from 'assets/icons/url.svg';
import { ReactComponent as Play } from 'assets/icons/play.svg';
import { ReactComponent as Stop } from 'assets/icons/stop.svg';

import * as API from 'apis';

import classes from './Song.module.scss';
import ReactPlayer from 'react-player';

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
	const [playing, setPlaying] = useState<boolean>(false);
	const [paused, setPaused] = useState<boolean>(false);

	const [media, setMedia] = useState<string>();

	async function playHandler() {
		if (!is_present) {
			return;
		}

		if (playing) {
			setPaused((prevState) => !prevState);
			return;
		}

		setPlaying(true);

		try {
			const { media } = await API.Song.getMedia(id);

			setMedia(media);
		} catch (error) {
			setPlaying(false);
		}
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
						playing ? classes.MediaActive : ''
					].join(' ')}
					onClick={playHandler}>
					<img className={classes.Image} src={image} alt={name} />

					{is_present && <div className={classes.Circle}>{!playing || paused ? <Play /> : <Stop />}</div>}

					<ReactPlayer
						url={media}
						playing={!paused}
						onEnded={() => setPlaying(false)}
						style={{ display: 'none' }}
					/>
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
