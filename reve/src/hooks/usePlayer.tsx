import React, { useEffect, useRef, useState } from 'react';

import ReactPlayer from 'react-player';

import * as ReactDOM from 'react-dom/client';

interface Props {
	media?: string;
	playing: boolean;
	onEnd?: () => void;
}

const usePlayer = ({ media, playing, onEnd }: Props) => {
	const [played, setPlayed] = useState<number>(0);

	const [loop, setLoop] = useState<boolean>(false);
	const [volume, setVolume] = useState<number>(1);
	const [mute, setMute] = useState<boolean>(false);

	const rootRef = useRef<ReactDOM.Root | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const playerRef = useRef<ReactPlayer | null>(null);

	useEffect(() => {
		// Create a hidden div for the player
		if (!containerRef.current) {
			containerRef.current = document.createElement('div');
			containerRef.current.style.display = 'none';
			document.body.appendChild(containerRef.current);
			rootRef.current = ReactDOM.createRoot(containerRef.current);
		}

		rootRef.current!.render(
			<ReactPlayer
				ref={playerRef}
				progressInterval={50}
				style={{ display: 'none' }}
				url={media}
				playing={playing}
				volume={volume}
				muted={mute}
				loop={loop}
				onProgress={(progress) => setPlayed(progress.played)}
				onEnded={onEnd}
			/>
		);

		return () => {
			// Delay cleanup to avoid React strict mode unmount issue
			setTimeout(() => {
				if (rootRef.current && containerRef.current) {
					rootRef.current.unmount();
					containerRef.current.remove();
					rootRef.current = null;
					containerRef.current = null;
				}
			}, 0);
		};
	}, []);

	useEffect(() => {
		handleSeek(0);
	}, [media]);

	useEffect(() => {
		if (!rootRef.current) {
			return;
		}

		rootRef.current.render(
			<ReactPlayer
				ref={playerRef}
				progressInterval={50}
				style={{ display: 'none' }}
				url={media}
				playing={playing}
				volume={volume}
				muted={mute}
				loop={loop}
				onProgress={(progress) => setPlayed(progress.played)}
				onEnded={onEnd}
			/>
		);
	}, [media, playing, volume, mute, loop, onEnd]);

	function handleSeek(value: number) {
		setPlayed(value);

		playerRef.current?.seekTo(value, 'fraction');
	}

	function handleLoop() {
		setLoop((prevState) => !prevState);
	}

	function handleVolume(value: number) {
		if (mute) {
			setMute(false);
		}

		setVolume(value);
	}

	function handleMute() {
		if (volume === 0 && !mute) {
			setVolume(0.75);

			return;
		}

		if (mute) {
			setMute(false);
		} else {
			setMute(true);
		}
	}

	return { played, loop, mute, volume, handleSeek, handleLoop, handleVolume, handleMute };
};

export default usePlayer;
