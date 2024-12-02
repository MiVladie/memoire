import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';

import ReactPlayer from 'react-player';
import Slider from 'components/Slider/Slider';
import Knob from 'components/Knob/Knob';

import { ISong } from 'interfaces/data';
import { OnProgressProps } from 'react-player/base';
import { convertSecondsToFormat } from 'utils/date';
import { QueueContext } from 'context/providers/queue';

import { ReactComponent as Previous } from 'assets/icons/skip_previous.svg';
import { ReactComponent as Next } from 'assets/icons/skip_next.svg';
import { ReactComponent as Play } from 'assets/icons/play.svg';
import { ReactComponent as Pause } from 'assets/icons/pause.svg';
import { ReactComponent as Repeat } from 'assets/icons/repeat.svg';
import { ReactComponent as Shuffle } from 'assets/icons/shuffle.svg';
import { ReactComponent as VolumeOff } from 'assets/icons/volume_off.svg';
import { ReactComponent as VolumeDown } from 'assets/icons/volume_down.svg';
import { ReactComponent as VolumeUp } from 'assets/icons/volume_up.svg';

import * as API from 'apis';

import classes from './Playbar.module.scss';

const REPEAT_SONG_THRESHOLD = 3;

const Playbar = () => {
	const [media, setMedia] = useState<string>();

	const [played, setPlayed] = useState<number>(0);
	const [volume, setVolume] = useState<number>(1);

	const [repeat, setRepeat] = useState<boolean>(false);
	const [shuffle, setShuffle] = useState<boolean>(false);
	const [muted, setMuted] = useState<boolean>(false);

	const playerRef = useRef<ReactPlayer>(null);

	const { state, ...QueueStore } = useContext(QueueContext);

	useEffect(() => {
		fetchSong();
	}, [state.currentId]);

	async function fetchSong() {
		QueueStore.pause();

		playerRef.current?.seekTo(0, 'fraction');

		try {
			const { media } = await API.Song.getMedia(state.currentId!);

			setMedia(media);

			QueueStore.play();
		} catch (error) {
			console.log(error);
		}
	}

	function previousHandler() {
		if (played * song.duration > REPEAT_SONG_THRESHOLD) {
			playerRef.current!.seekTo(0, 'fraction');

			setPlayed(0);

			return;
		}

		QueueStore.playPrevious();
	}

	function playHandler() {
		if (state.playing) {
			QueueStore.pause();

			return;
		}

		QueueStore.play();
	}

	function nextHandler() {
		QueueStore.playNext();
	}

	function seekHandler(value: number) {
		playerRef.current!.seekTo(value, 'fraction');

		if (!state.playing) {
			QueueStore.play();
		}
	}

	function volumeHandler(value: number) {
		if (muted) {
			setMuted(false);
		}

		setVolume(value);
	}

	function repeatHandler() {
		setRepeat((prevState) => !prevState);
	}

	function shuffleHandler() {
		setShuffle((prevState) => !prevState);
	}

	function muteHandler() {
		if (volume === 0 && !muted) {
			setVolume(0.75);

			return;
		}

		if (muted) {
			setMuted(false);
		} else {
			setMuted(true);
		}
	}

	function progressHandler({ played }: OnProgressProps) {
		setPlayed(played);
	}

	function endHandler() {
		// setPlaying(false);

		QueueStore.playNext();
	}

	const song = useMemo(() => state.list.find((song) => song.id === state.currentId)!, [state.currentId]);

	if (!state.currentId) {
		return null;
	}

	return (
		<div className={classes.Playbar}>
			<div className={classes.Info}>
				<img className={classes.Image} src={song.image!} alt={song.name} />

				<div className={classes.Meta}>
					<p className={classes.Name}>{song.name}</p>
					<p className={classes.Author}>{song.author}</p>
				</div>
			</div>

			<div className={classes.Actions}>
				<div className={classes.Buttons}>
					<Knob icon={<Previous />} onClick={previousHandler} />

					<Knob
						icon={state.playing ? <Pause /> : <Play />}
						onClick={playHandler}
						className={classes.Play}
						highlighted
					/>

					<Knob icon={<Next />} onClick={nextHandler} />
				</div>

				<div className={classes.Playback}>
					<p className={classes.Time}>{convertSecondsToFormat(played * song.duration)}</p>

					<Slider value={played} onChange={seekHandler} className={classes.Timeline} />

					<p className={classes.Time}>{convertSecondsToFormat(song.duration)}</p>
				</div>
			</div>

			<div className={classes.Controls}>
				<Knob icon={<Repeat />} active={repeat} onClick={repeatHandler} />

				<Knob icon={<Shuffle />} active={shuffle} onClick={shuffleHandler} />

				<Knob
					icon={volume === 0 || muted ? <VolumeOff /> : volume < 0.5 ? <VolumeDown /> : <VolumeUp />}
					active={volume > 0 && !muted}
					onClick={muteHandler}
				/>

				<Slider value={!muted ? volume : 0} onChange={volumeHandler} className={classes.Volume} />
			</div>

			<ReactPlayer
				ref={playerRef}
				url={media}
				playing={state.playing}
				volume={volume}
				muted={muted}
				loop={repeat}
				progressInterval={50}
				onProgress={progressHandler}
				onEnded={endHandler}
				style={{ display: 'none' }}
			/>
		</div>
	);
};

export default Playbar;
