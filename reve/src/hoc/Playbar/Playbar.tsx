import React, { useState, useEffect, useRef } from 'react';

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

interface LoadOptions {
	isNext?: boolean;
	isPrevious?: boolean;
}

interface PreloadOptions {
	nextSong?: Song;
	previousSong?: Song;
}

const REPEAT_SONG_THRESHOLD = 3;

const Playbar = () => {
	const [song, setSong] = useState<Song>();

	const previousMedia = useRef<string>();
	const media = useRef<string>();
	const nextMedia = useRef<string>();

	const [loading, setLoading] = useState<boolean>(true);

	const { state, subscribe, play, previous, next, shuffle } = useQueue();

	const {
		state: { queueActive, queueVisible, queueExpanded },
		toggleQueue,
		expandQueue
	} = useNavigation();

	const { played, loop, mute, volume, handleSeek, handleLoop, handleVolume, handleMute } = usePlayer({
		media: media.current,
		playing: state.playing && !loading,
		onEnd: next
	});

	const { color } = useColor({ src: song?.image });

	const { isDesktop } = useScreen();

	useEffect(() => {
		const unsubscribe = subscribe((action, newState) => {
			const previousSong =
				newState.playingIndex != null && newState.playingIndex > 0
					? newState.list[newState.playingIndex - 1]
					: undefined;
			const nextSong =
				newState.playingIndex != null && newState.playingIndex + 1 < newState.list.length
					? newState.list[newState.playingIndex + 1]
					: undefined;

			switch (action) {
				case QueueActions.SHUFFLE_PLAYLIST:
					preloadSongs({ previousSong, nextSong });
					break;

				case QueueActions.START_PLAYLIST:
				case QueueActions.PLAY_SONG:
					loadHandler(newState.activeSong!);
					preloadSongs({ previousSong, nextSong });
					break;

				case QueueActions.NEXT_SONG:
					loadHandler(newState.activeSong!, { isNext: true });
					preloadSongs({ nextSong });
					break;

				case QueueActions.PREVIOUS_SONG:
					loadHandler(newState.activeSong!, { isPrevious: true });
					preloadSongs({ previousSong });
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

		updateMediaSession(song);
	}, [song, played]);

	async function loadHandler(song: Song, options?: LoadOptions) {
		setSong(song);

		updateMediaSession(song);
		handleSeek(0);

		try {
			if (options?.isNext) {
				if (nextMedia.current) {
					previousMedia.current = media.current;

					media.current = nextMedia.current;

					nextMedia.current = undefined;
				} else {
					setLoading(true);

					const { media: newMedia } = await API.Song.getMedia(song.id);

					nextMedia.current = undefined;
					previousMedia.current = media.current;

					media.current = newMedia;
				}
			} else if (options?.isPrevious) {
				if (previousMedia.current) {
					nextMedia.current = media.current;

					media.current = previousMedia.current;

					previousMedia.current = undefined;
				} else {
					setLoading(true);

					const { media: newMedia } = await API.Song.getMedia(song.id);

					nextMedia.current = media.current;
					previousMedia.current = undefined;

					media.current = newMedia;
				}
			} else {
				setLoading(true);

				media.current = (await API.Song.getMedia(song.id)).media;
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}

	async function preloadSongs(options: PreloadOptions) {
		// Preload previous song
		if (options.previousSong) {
			previousMedia.current = (await API.Song.getMedia(options.previousSong.id)).media;
		}

		// Preload next song
		if (options.nextSong) {
			nextMedia.current = (await API.Song.getMedia(options.nextSong.id)).media;
		}
	}

	function previousHandler() {
		if (played * song!.duration > REPEAT_SONG_THRESHOLD || state.playingIndex === 0) {
			handleSeek(0);

			return;
		}

		previous();
	}

	function updateMediaSession(song: Song) {
		// Allow play actions for browsers
		if (!('mediaSession' in navigator)) {
			return;
		}

		navigator.mediaSession.metadata = new MediaMetadata({
			title: song.name,
			artist: song.author,
			artwork: song.image ? [{ src: song.image }] : undefined
		});

		navigator.mediaSession.setActionHandler('previoustrack', previousHandler);
		navigator.mediaSession.setActionHandler('nexttrack', next);
		navigator.mediaSession.setActionHandler('pause', () => play());
		navigator.mediaSession.setActionHandler('play', () => play());
		navigator.mediaSession.setActionHandler('seekto', (e) => e.seekTime && handleSeek(e.seekTime / song.duration));

		if (!isDevice(Device.iOS)) {
			navigator.mediaSession.setActionHandler('seekbackward', (details) =>
				handleSeek(Math.max(played - (details.seekOffset || 10) / song.duration, 0))
			);
			navigator.mediaSession.setActionHandler('seekforward', (details) =>
				handleSeek(played + (details.seekOffset || 10) / song.duration)
			);
		}
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
						<Knob
							icon={<Previous />}
							onClick={previousHandler}
							disabled={loading}
							size={queueExpanded ? 48 : undefined}
						/>

						<Knob
							icon={state.playing ? <Pause /> : <Play />}
							onClick={play}
							className={classes.Play}
							size={queueExpanded ? 48 : undefined}
							fill
						/>

						<Knob icon={<Next />} onClick={next} disabled={loading} size={queueExpanded ? 48 : undefined} />
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
						active={state.shuffled}
						onClick={shuffle}
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
