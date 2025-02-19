import React, { useState, useEffect } from 'react';

import { convertSecondsToFormat } from 'util/date';
import { useNavigation } from 'context/useNavigation';
import { Song } from 'interfaces/models';
import { QueueActions, useQueue } from 'context/useQueue';
import { Device } from 'interfaces/common';
import { isDevice } from 'util/common';
import { clsx } from 'util/style';

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

import Knob from 'components/Knob/Knob';
import Slider from 'components/Slider/Slider';
import Queue from 'containers/Queue/Queue';
import Skeleton from 'components/Skeleton/Skeleton';

import usePlayer from 'hooks/usePlayer';
import useScreen from 'hooks/useScreen';
import useColor from 'hooks/useColor';

import * as API from 'api';

import classes from './Playbar.module.scss';

const REPEAT_SONG_THRESHOLD = 3;

const Playbar = () => {
	const [song, setSong] = useState<Song>();
	const [media, setMedia] = useState<string>();

	const [shuffle, setShuffle] = useState<boolean>(false);

	const [loading, setLoading] = useState<boolean>(true);

	const { state, subscribe, play, previous, next } = useQueue();

	const {
		state: { queueActive, queueVisible, queueExpanded },
		toggleQueue,
		expandQueue
	} = useNavigation();

	const { played, loop, mute, volume, handleSeek, handleLoop, handleVolume, handleMute } = usePlayer({
		media,
		playing: state.playing && !loading,
		onEnd: next
	});

	const { color } = useColor({ src: song?.image });

	const { isDesktop } = useScreen();

	useEffect(() => {
		const unsubscribe = subscribe((action, newState) => {
			switch (action) {
				case QueueActions.START_PLAYLIST:
					fetchSong(newState.list[newState.playingIndex!]);
					break;

				case QueueActions.PLAY_SONG:
					fetchSong(newState.list[newState.playingIndex!]);
					break;

				case QueueActions.NEXT_SONG:
					fetchSong(newState.list[newState.playingIndex!]);
					break;

				case QueueActions.PREVIOUS_SONG:
					fetchSong(newState.list[newState.playingIndex!]);
					break;

				case QueueActions.FINISH_PLAYLIST:
					handleSeek(0);
					break;

				default:
					break;
			}
		});

		return unsubscribe;
	}, []);

	useEffect(() => {
		if (!song) {
			return;
		}

		// Allow play actions for browsers
		if ('mediaSession' in navigator) {
			navigator.mediaSession.metadata = new MediaMetadata({
				title: song.name,
				artist: song.author,
				artwork: song.image ? [{ src: song.image }] : undefined
			});

			navigator.mediaSession.setActionHandler('previoustrack', previousHandler);
			navigator.mediaSession.setActionHandler('nexttrack', next);
			navigator.mediaSession.setActionHandler('pause', () => play());
			navigator.mediaSession.setActionHandler('play', () => play());
			navigator.mediaSession.setActionHandler(
				'seekto',
				(e) => e.seekTime && handleSeek(e.seekTime / song.duration)
			);

			if (!isDevice(Device.iOS)) {
				navigator.mediaSession.setActionHandler('seekbackward', (details) =>
					handleSeek(Math.max(played - (details.seekOffset || 10) / song.duration, 0))
				);
				navigator.mediaSession.setActionHandler('seekforward', (details) =>
					handleSeek(played + (details.seekOffset || 10) / song.duration)
				);
			}
		}
	}, [song, played]);

	async function fetchSong(song: Song) {
		setMedia(undefined);
		setSong(song);

		setLoading(true);

		try {
			const { media } = await API.Song.getMedia(song.id);

			setMedia(media);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}

	function previousHandler() {
		if (played * song!.duration > REPEAT_SONG_THRESHOLD || state.playingIndex === 0) {
			handleSeek(0);

			return;
		}

		previous();
	}

	function shuffleHandler() {
		setShuffle((prevState) => !prevState);
	}

	return (
		<>
			<footer
				className={clsx(classes.Playbar, {
					[classes.PlaybarVisible]: queueActive,
					[classes.PlaybarExpanded]: queueExpanded,
					[classes.PlaybarView]: queueVisible
				})}>
				<div className={classes.Menu}>
					<Knob icon={<ArrowDown />} className={classes.Arrow} onClick={expandQueue} size={48} />
					<Knob icon={<MusicQueue />} onClick={toggleQueue} size={48} />
				</div>

				<div
					className={classes.Info}
					onClick={() => (!queueExpanded ? expandQueue() : queueVisible ? toggleQueue() : undefined)}>
					{song ? (
						<img className={classes.Image} src={song.image!} alt={song.name} />
					) : (
						<Skeleton className={classes.Image} />
					)}

					{song ? (
						<div className={classes.Meta}>
							<p className={classes.Title}>{song.name}</p>
							<p className={classes.Author}>{song.author}</p>
						</div>
					) : (
						<div className={classes.Meta}>
							<Skeleton className={classes.Title} width={100} />
							<Skeleton className={classes.Author} width={50} />
						</div>
					)}
				</div>

				<div className={classes.Actions}>
					<div className={classes.Buttons}>
						<Knob icon={<Previous />} onClick={previousHandler} size={queueExpanded ? 48 : undefined} />

						<Knob
							icon={state.playing ? <Pause /> : <Play />}
							onClick={play}
							className={classes.Play}
							size={queueExpanded ? 48 : undefined}
							fill
						/>

						<Knob icon={<Next />} onClick={next} size={queueExpanded ? 48 : undefined} />
					</div>

					<div className={classes.Playback}>
						<p className={classes.Time}>{convertSecondsToFormat(played * (song?.duration ?? 0))}</p>

						<Slider value={played} onChange={handleSeek} className={classes.Timeline} />

						<p className={classes.Time}>{convertSecondsToFormat(song?.duration ?? 0)}</p>
					</div>
				</div>

				<div className={classes.Controls}>
					<Knob
						icon={<Repeat />}
						active={loop}
						onClick={handleLoop}
						size={queueExpanded ? 48 : undefined}
						className={classes.Repeat}
					/>

					<Knob
						icon={<Shuffle />}
						active={shuffle}
						onClick={shuffleHandler}
						size={queueExpanded ? 48 : undefined}
						className={classes.Shuffle}
					/>

					<Knob
						icon={volume === 0 || mute ? <VolumeOff /> : volume < 0.5 ? <VolumeDown /> : <VolumeUp />}
						active={volume > 0 && !mute}
						onClick={handleMute}
						className={classes.Sound}
					/>

					<Slider value={!mute ? volume : 0} onChange={handleVolume} className={classes.Volume} />
				</div>

				<div className={classes.Gradient} style={{ backgroundImage: `linear-gradient(${color}, #121212)` }} />
			</footer>

			{!isDesktop && <Queue className={classes.Queue} />}
		</>
	);
};

export default Playbar;
