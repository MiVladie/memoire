import React, { useContext, createContext, useMemo, useState } from 'react';

import { ISong } from 'interfaces/data';
import { SONGS } from 'assets/data/sample';

interface PlayOptions {
	playlistId: number;
	songId?: number;
}

interface State {
	playlistId: number | null;
	list: ISong[];
	playingIndex: number | null;
	playing: boolean;
}

interface Context {
	state: State;
	play: (playOptions?: PlayOptions) => void;
	stop: () => void;
	previous: () => void;
	next: () => void;
}

const defaultState: State = {
	playlistId: null,
	list: [],
	playingIndex: null,
	playing: false
};

const QueueContext = createContext<Context>({} as Context);

export const QueueProvider = ({ children }: any) => {
	const [state, setState] = useState<State>(defaultState);

	function play(options?: PlayOptions) {
		// Resume playing current song
		if (!options) {
			setState((prevState) => ({ ...prevState, playing: !prevState.playing }));

			return;
		}

		// Play a song from current playlist
		if (options.songId && options.playlistId === state.playlistId) {
			const songIndex = state.list.findIndex((s) => s.id === options.songId);

			setState((prevState) => ({ ...prevState, playingIndex: songIndex, playing: true }));

			return;
		}

		// Play first song from another playlist
		if (options.playlistId && !options.songId) {
			// TODO: fetch new playlist songs
			const list: ISong[] = SONGS;

			setState((prevState) => ({
				...prevState,
				playlistId: options.playlistId!,
				playingIndex: 0,
				list: list,
				playing: true
			}));

			return;
		}

		// Play a song from another playlist
		if (options.playlistId && options.songId) {
			// TODO: fetch new playlist songs
			const list: ISong[] = SONGS;
			const songIndex: number = 0;

			setState((prevState) => ({
				...prevState,
				playlistId: options.playlistId!,
				playingIndex: songIndex,
				list: list,
				playing: true
			}));

			return;
		}
	}

	function stop() {
		setState((prevState) => ({ ...prevState, playlistId: null, playing: false }));
	}

	function previous() {
		if (state.playingIndex === 0) {
			return;
		}

		setState((prevState) => ({
			...prevState,
			playingIndex: prevState.playingIndex! - 1,
			playing: true
		}));
	}

	function next() {
		if (state.playingIndex === state.list.length - 1) {
			return;
		}

		setState((prevState) => ({
			...prevState,
			playingIndex: prevState.playingIndex! + 1,
			playing: true
		}));
	}

	const value = useMemo(() => ({ state, play, stop, previous, next }), [state]);

	return <QueueContext.Provider value={value}>{children}</QueueContext.Provider>;
};

export const useQueue = () => {
	return useContext(QueueContext);
};
