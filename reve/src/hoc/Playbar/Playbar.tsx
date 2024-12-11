import React, { useState, useRef, useEffect } from 'react';

import { OnProgressProps } from 'react-player/base';
import { convertSecondsToFormat } from 'util/date';
import { SONGS } from 'assets/data/sample';
import { useQueue } from 'context/useQueue';
import { rgbToHEX } from 'util/style';

import { ReactComponent as Previous } from 'assets/icons/previous.svg';
import { ReactComponent as Next } from 'assets/icons/next.svg';
import { ReactComponent as Play } from 'assets/icons/play.svg';
import { ReactComponent as Pause } from 'assets/icons/pause.svg';
import { ReactComponent as Repeat } from 'assets/icons/repeat.svg';
import { ReactComponent as Shuffle } from 'assets/icons/shuffle.svg';
import { ReactComponent as VolumeOff } from 'assets/icons/volume_off.svg';
import { ReactComponent as VolumeDown } from 'assets/icons/volume_down.svg';
import { ReactComponent as VolumeUp } from 'assets/icons/volume_up.svg';
import { ReactComponent as ArrowDown } from 'assets/icons/arrow_down.svg';
import { ReactComponent as MusicQueue } from 'assets/icons/queue.svg';

// @ts-ignore
import ColorThief from 'colorthief';
import Knob from 'components/Knob/Knob';
import Slider from 'components/Slider/Slider';
import ReactPlayer from 'react-player';
import Queue from 'containers/Queue/Queue';
import useScreen from 'hooks/useScreen';

import * as API from 'api';

import classes from './Playbar.module.scss';

const song = SONGS[0];

const REPEAT_SONG_THRESHOLD = 3;

const Playbar = () => {
	const [media, setMedia] = useState<string>();

	const [played, setPlayed] = useState<number>(0);
	const [volume, setVolume] = useState<number>(1);

	const [repeat, setRepeat] = useState<boolean>(false);
	const [shuffle, setShuffle] = useState<boolean>(false);
	const [muted, setMuted] = useState<boolean>(false);

	const [expanded, setExpanded] = useState<boolean>(false);
	const [color, setColor] = useState<string>();

	const { isDesktop } = useScreen();

	const { state, play, view } = useQueue();

	const imageRef = useRef<HTMLImageElement>(null);
	const playerRef = useRef<ReactPlayer>(null);

	useEffect(() => {
		fetchSong();
	}, [song]);

	useEffect(() => {
		if (isDesktop && expanded) {
			setExpanded(false);
		}
	}, [isDesktop]);

	async function fetchSong() {
		playerRef.current?.seekTo(0, 'fraction');

		try {
			const { media } = await API.Song.getMedia(song.id);

			setMedia(media);

			play();
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

		// previous();
	}

	function playHandler() {
		play();
	}

	function nextHandler() {
		// next();
	}

	function seekHandler(value: number) {
		playerRef.current!.seekTo(value, 'fraction');

		// if (!state.playing) {
		// 	play();
		// }
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
		//
	}

	function expandHandler() {
		if (isDesktop) {
			return;
		}

		if (!expanded && !color) {
			const colorThief = new ColorThief();

			const color = colorThief.getColor(imageRef.current) as [number, number, number];

			setColor(`linear-gradient(${rgbToHEX(...color)}, #121212)`);
		}

		setExpanded(true);
	}

	function hideHandler() {
		setExpanded(false);
	}

	function queueHandler() {
		view();
	}

	return (
		<>
			<footer
				className={[
					classes.Playbar,
					state.active ? classes.PlaybarVisible : '',
					expanded ? classes.PlaybarExpanded : '',
					state.viewing ? classes.PlaybarView : ''
				].join(' ')}>
				<div className={classes.Menu}>
					<Knob icon={<ArrowDown />} className={classes.Arrow} onClick={hideHandler} size={48} />
					<Knob icon={<MusicQueue />} onClick={queueHandler} size={48} />
				</div>

				<div
					className={classes.Info}
					onClick={!expanded ? expandHandler : state.viewing ? queueHandler : undefined}>
					<img
						className={classes.Image}
						src={song.image!}
						alt={song.name}
						ref={imageRef}
						crossOrigin='anonymous'
					/>

					<div className={classes.Meta}>
						<p className={classes.Title}>{song.name}</p>
						<p className={classes.Author}>{song.author}</p>
					</div>
				</div>

				<div className={classes.Actions}>
					<div className={classes.Buttons}>
						<Knob icon={<Previous />} onClick={previousHandler} size={expanded ? 48 : undefined} />

						<Knob
							icon={state.playing ? <Pause /> : <Play />}
							onClick={playHandler}
							className={classes.Play}
							size={expanded ? 48 : undefined}
							fill
						/>

						<Knob icon={<Next />} onClick={nextHandler} size={expanded ? 48 : undefined} />
					</div>

					<div className={classes.Playback}>
						<p className={classes.Time}>{convertSecondsToFormat(played * song.duration)}</p>

						<Slider value={played} onChange={seekHandler} className={classes.Timeline} />

						<p className={classes.Time}>{convertSecondsToFormat(song.duration)}</p>
					</div>
				</div>

				<div className={classes.Controls}>
					<Knob
						icon={<Repeat />}
						active={repeat}
						onClick={repeatHandler}
						size={expanded ? 48 : undefined}
						className={classes.Repeat}
					/>

					<Knob
						icon={<Shuffle />}
						active={shuffle}
						onClick={shuffleHandler}
						size={expanded ? 48 : undefined}
						className={classes.Shuffle}
					/>

					<Knob
						icon={volume === 0 || muted ? <VolumeOff /> : volume < 0.5 ? <VolumeDown /> : <VolumeUp />}
						active={volume > 0 && !muted}
						onClick={muteHandler}
						className={classes.Sound}
					/>

					<Slider value={!muted ? volume : 0} onChange={volumeHandler} className={classes.Volume} />
				</div>

				<div className={classes.Gradient} style={{ backgroundImage: color }} />

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
			</footer>

			<Queue current={SONGS[0]} list={SONGS} visible={state.viewing} className={classes.Queue} />
		</>
	);
};

export default Playbar;
