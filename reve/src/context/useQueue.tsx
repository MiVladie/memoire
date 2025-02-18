import React, { useContext, createContext, useMemo, useState } from 'react';

import { Song } from 'interfaces/models';

import * as API from 'api';
import { delay } from 'util/date';

export enum QueueActions {
	START_PLAYLIST,
	FINISH_PLAYLIST,
	CLOSE_PLAYLIST,

	PLAY_SONG,
	NEXT_SONG,
	PREVIOUS_SONG
}

interface PlayOptions {
	playlistId: number;
	songId?: number;
}

interface AddOptions {
	reset?: boolean;
}

interface State {
	playlistId: number | null;
	list: Song[];
	playingIndex: number | null;
	playing: boolean;
	retrieving: boolean;
	allRetrieved: boolean;
}

interface Context {
	state: State;
	subscribe: (callback: (action: QueueActions, state: State) => void) => () => void;
	retrieve: () => Promise<void>;
	play: (options?: PlayOptions) => void;
	stop: () => void;
	previous: () => void;
	next: () => void;
	add: (song: Song, options?: AddOptions) => void;
	remove: (songIndex: number) => void;
}

const defaultState: State = {
	playlistId: null,
	list: [],
	playingIndex: null,
	playing: false,
	retrieving: false,
	allRetrieved: false
};

const QueueContext = createContext<Context>({} as Context);

const subscribers = new Set<(action: QueueActions, state: State) => void>();

function notifySubscribers(action: QueueActions, state: State) {
	subscribers.forEach((cb) => cb(action, state));
}

export const QueueProvider = ({ children }: any) => {
	const [state, setState] = useState<State>(defaultState);

	function subscribe(callback: (action: QueueActions, state: State) => void) {
		subscribers.add(callback);

		return () => {
			subscribers.delete(callback);
		};
	}

	async function retrieve() {
		if (state.playlistId === null || state.allRetrieved) {
			return;
		}

		setState((prevState) => ({ ...prevState, retrieving: true }));

		const lastSong = state.list.length > 0 ? state.list[state.list.length - 1] : undefined;

		try {
			const { songs } = await API.User.getPlaylistSongs(state.playlistId, {
				cursor: lastSong?.id,
				isPresent: true
			});

			setState((prevState) => ({
				...prevState,
				list: [...prevState.list, ...songs],
				allRetrieved: songs.length === 0
			}));
		} catch (error) {
			console.error(error);
		} finally {
			setState((prevState) => ({ ...prevState, retrieving: false }));
		}
	}

	async function play(options?: PlayOptions) {
		// Resume playing current song
		if (!options) {
			setState((prevState) => ({ ...prevState, playing: !prevState.playing }));

			return;
		}

		// Play a song from current playlist
		if (options.songId && options.playlistId === state.playlistId) {
			const songIndex = state.list.findIndex((s) => s.id === options.songId);

			setState((prevState) => {
				const newState = { ...prevState, playingIndex: songIndex, playing: true };

				notifySubscribers(QueueActions.PLAY_SONG, newState);

				return newState;
			});

			return;
		}

		// Play first song from another playlist
		if (options.playlistId && !options.songId) {
			setState((prevState) => ({ ...prevState, retrieving: true }));

			const { songs } = await API.User.getPlaylistSongs(options.playlistId, { isPresent: true });

			setState((prevState) => {
				const newState = {
					...prevState,
					playlistId: options.playlistId!,
					playingIndex: 0,
					list: songs,
					playing: true,
					retrieving: false,
					allRetrieved: false
				};

				notifySubscribers(QueueActions.START_PLAYLIST, newState);

				return newState;
			});

			return;
		}

		// Play a song from another playlist
		if (options.playlistId && options.songId) {
			setState((prevState) => ({ ...prevState, retrieving: true }));

			const { songs } = await API.User.getPlaylistSongs(options.playlistId, {
				isPresent: true,
				cursor: options.songId
			});

			const songIndex: number = 0;

			setState((prevState) => {
				const newState = {
					...prevState,
					playlistId: options.playlistId!,
					playingIndex: songIndex,
					list: songs,
					playing: true,
					retrieving: false,
					allRetrieved: false
				};

				notifySubscribers(QueueActions.START_PLAYLIST, newState);

				return newState;
			});

			return;
		}
	}

	function stop() {
		setState((prevState) => {
			const newState = { ...prevState, playlistId: null, playing: false };

			notifySubscribers(QueueActions.CLOSE_PLAYLIST, newState);

			return newState;
		});
	}

	function previous() {
		if (state.playingIndex === 0) {
			return;
		}

		setState((prevState) => {
			const newState = {
				...prevState,
				playingIndex: prevState.playingIndex! - 1,
				playing: true
			};

			notifySubscribers(QueueActions.PREVIOUS_SONG, newState);

			return newState;
		});
	}

	async function next() {
		// Retrieve more songs if possible
		if (state.playlistId !== null && state.playingIndex! + 1 === state.list.length - 1 && !state.allRetrieved) {
			setState((prevState) => ({ ...prevState, retrieving: true }));

			const { songs } = await API.User.getPlaylistSongs(state.playlistId!, {
				cursor: state.list[state.playingIndex! + 1].id,
				isPresent: true
			});

			// Play the next song in the playlist
			setState((prevState) => ({
				...prevState,
				list: [...prevState.list, ...songs],
				retrieving: false,
				allRetrieved: songs.length === 0
			}));
		}

		// Reached the end of the playlist
		if (state.playingIndex === state.list.length - 1) {
			setState((prevState) => {
				const newState = {
					...prevState,
					playing: false
				};

				notifySubscribers(QueueActions.FINISH_PLAYLIST, newState);

				return newState;
			});

			return;
		}

		// Play the next song in the playlist
		setState((prevState) => {
			const newState = {
				...prevState,
				playingIndex: prevState.playingIndex! + 1,
				playing: true
			};

			notifySubscribers(QueueActions.NEXT_SONG, newState);

			return newState;
		});
	}

	async function add(song: Song, options?: AddOptions) {
		// Reset old playlist and start with a new song
		if (options?.reset) {
			const newState = {
				playlistId: null,
				list: [song],
				playing: true,
				playingIndex: 0,
				retrieving: false,
				allRetrieved: false
			};

			setState(newState);

			notifySubscribers(QueueActions.START_PLAYLIST, newState);

			return;
		}

		// A song has been added to an empty queue
		if (state.list.length === 0) {
			const newState = {
				playlistId: null,
				list: [song],
				playing: true,
				playingIndex: 0,
				retrieving: false,
				allRetrieved: false
			};

			setState(newState);

			notifySubscribers(QueueActions.START_PLAYLIST, newState);

			return;
		}

		// Added song to a finished playlist
		if (state.playingIndex === state.list.length - 1 && !state.playing) {
			const newState = {
				playlistId: null,
				list: [...state.list, song],
				playing: true,
				playingIndex: state.playingIndex + 1,
				retrieving: false,
				allRetrieved: false
			};

			setState(newState);

			notifySubscribers(QueueActions.PLAY_SONG, newState);

			return;
		}

		// Add a song to the end of the queue
		const newState = {
			...state,
			playlistId: null,
			list: [...state.list, song]
		};

		setState(newState);
	}

	function remove(songIndex: number) {
		// Removing last song from queue
		if (state.list.length === 1) {
			setState((prevState) => {
				const newState = { ...prevState, playlistId: null, playing: false };

				notifySubscribers(QueueActions.CLOSE_PLAYLIST, newState);

				return newState;
			});

			return;
		}

		// Remove song before the currently playing one
		if (songIndex < state.playingIndex!) {
			setState((prevState) => ({
				...prevState,
				list: prevState.list.filter((_, i) => i !== songIndex),
				playingIndex: prevState.playingIndex! - 1
			}));

			return;
		}

		// Remove song after the currently playing one
		if (songIndex > state.playingIndex!) {
			setState((prevState) => ({ ...prevState, list: prevState.list.filter((_, i) => i !== songIndex) }));

			return;
		}

		// Remove currently playing song
		if (songIndex === state.playingIndex) {
			// Switch to next
			if (state.list.length - 1 !== songIndex) {
				setState((prevState) => {
					const newState = { ...prevState, list: prevState.list.filter((_, i) => i !== songIndex) };

					notifySubscribers(QueueActions.NEXT_SONG, newState);

					return newState;
				});

				return;
			}

			// Finish playlist
			setState((prevState) => {
				const newState = { ...prevState, playing: false };

				notifySubscribers(QueueActions.FINISH_PLAYLIST, newState);

				return newState;
			});

			return;
		}
	}

	const value = useMemo(() => ({ state, subscribe, retrieve, play, stop, previous, next, add, remove }), [state]);

	return <QueueContext.Provider value={value}>{children}</QueueContext.Provider>;
};

export const useQueue = () => {
	return useContext(QueueContext);
};
