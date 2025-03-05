import React, { useContext, createContext, useMemo, useState, useEffect } from 'react';

import { Song } from 'interfaces/models';
import { generateRandomString, shuffleArray } from 'util/common';

import * as API from 'api';

export enum QueueActions {
	START_PLAYLIST,
	SHUFFLE_PLAYLIST,
	FINISH_PLAYLIST,
	CLOSE_PLAYLIST,

	PLAY_SONG,
	NEXT_SONG,
	PREVIOUS_SONG
}

interface PlayOptions {
	playlistId: number;
	song?: Song;
}

interface AddOptions {
	reset?: boolean;
}

interface State {
	playlistId: number | null;
	seed: string | null;
	shuffled: boolean;
	list: Song[];
	playingIndex: number | null;
	activeSong: Song | null;
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
	shuffle: () => void;
}

const defaultState: State = {
	playlistId: null,
	seed: null,
	shuffled: false,
	list: [],
	playingIndex: null,
	activeSong: null,
	playing: false,
	retrieving: false,
	allRetrieved: false
};

const QueueContext = createContext<Context>({} as Context);

const subscribers = new Set<(action: QueueActions, state: State) => void>();

export const QueueProvider = ({ children }: any) => {
	const [state, setState] = useState<State>(defaultState);

	const [action, setAction] = useState<QueueActions | null>(null);

	useEffect(() => {
		if (action === null) {
			return;
		}

		subscribers.forEach((cb) => cb(action, state));

		setAction(null);
	}, [action]);

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
				seed: state.seed ?? undefined,
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
		const inSamePlaylist = options?.playlistId === state.playlistId;
		const isSameSong = options?.song?.id === state.activeSong?.id;

		// Scenario 1: Resume playing current song
		if (!options || (inSamePlaylist && isSameSong)) {
			setState((prevState) => ({ ...prevState, playing: !prevState.playing }));

			return;
		}

		// Scenario 2: Play a song from current playlist
		if (options.song && inSamePlaylist) {
			const songIndex = state.list.findIndex((s) => s.id === options.song!.id);

			// If song not found (was deleted), skip to Scenario 4
			if (songIndex !== -1) {
				setState((prevState) => ({
					...prevState,
					playingIndex: songIndex,
					activeSong: options.song!,
					playing: true
				}));

				if (songIndex === state.playingIndex! + 1) {
					setAction(QueueActions.NEXT_SONG);
				} else if (songIndex === state.playingIndex! - 1) {
					setAction(QueueActions.PREVIOUS_SONG);
				} else {
					setAction(QueueActions.PLAY_SONG);
				}

				return;
			}
		}

		// Scenario 3: Play first song from another playlist
		if (options.playlistId && !options.song) {
			setState((prevState) => ({ ...prevState, retrieving: true }));

			const { songs } = await API.User.getPlaylistSongs(options.playlistId, {
				isPresent: true
			});

			setState((prevState) => ({
				...prevState,
				playlistId: options.playlistId!,
				seed: null,
				shuffled: false,
				playingIndex: 0,
				activeSong: songs[0],
				list: songs,
				playing: true,
				retrieving: false,
				allRetrieved: false
			}));

			setAction(QueueActions.START_PLAYLIST);

			return;
		}

		// Scenario 4: Play a song from same/another playlist
		if (options.playlistId && options.song) {
			setState((prevState) => ({
				...prevState,
				seed: null,
				shuffled: false,
				activeSong: options.song!,
				playingIndex: null,
				retrieving: true
			}));

			setTimeout(() => setAction(QueueActions.START_PLAYLIST), 0);

			const list: Song[] = [];
			let songIndex: number = -1;
			let cursor = undefined;

			do {
				const { songs } = await API.User.getPlaylistSongs(options.playlistId, {
					isPresent: true,
					cursor: cursor
				});

				if (songs.length === 0) {
					throw new Error('Oops, something went wrong!');
				}

				list.push(...songs);

				songIndex = list.findIndex((s) => s.id === options.song!.id);
				cursor = songs[songs.length - 1].id;
			} while (songIndex === -1);

			setState((prevState) => ({
				...prevState,
				playlistId: options.playlistId!,
				playingIndex: songIndex,
				list: list,
				playing: true,
				retrieving: false,
				allRetrieved: false
			}));

			return;
		}
	}

	function stop() {
		setState((prevState) => ({
			...prevState,
			playlistId: null,
			seed: null,
			shuffled: false,
			activeSong: null,
			playing: false
		}));

		setAction(QueueActions.CLOSE_PLAYLIST);
	}

	function previous() {
		if (state.playingIndex === 0) {
			return;
		}

		setState((prevState) => ({
			...prevState,
			playingIndex: prevState.playingIndex! - 1,
			activeSong: prevState.list[prevState.playingIndex! - 1],
			playing: true
		}));

		setAction(QueueActions.PREVIOUS_SONG);
	}

	async function next() {
		const isLast = state.playingIndex === state.list.length - 1;
		const isPenultimate = state.playingIndex! + 1 === state.list.length - 1;

		// Reached the end of the playlist
		if (isLast) {
			setState((prevState) => ({
				...prevState,
				playing: false
			}));

			setAction(QueueActions.FINISH_PLAYLIST);

			return;
		}

		// Play the next song in the playlist
		setState((prevState) => ({
			...prevState,
			playingIndex: prevState.playingIndex! + 1,
			activeSong: prevState.list[prevState.playingIndex! + 1],
			playing: true
		}));

		setTimeout(() => setAction(QueueActions.NEXT_SONG), 0);

		// Retrieve more songs if possible
		if (state.playlistId !== null && isPenultimate && !state.allRetrieved) {
			setState((prevState) => ({ ...prevState, retrieving: true }));

			const { songs } = await API.User.getPlaylistSongs(state.playlistId!, {
				seed: state.seed ?? undefined,
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
	}

	async function add(song: Song, options?: AddOptions) {
		const isLast = state.playingIndex === state.list.length - 1;

		// Reset old playlist and start with a new song || a song has been added to an empty queue
		if (options?.reset || state.list.length === 0) {
			const newState = {
				playlistId: null,
				seed: null,
				shuffled: false,
				list: [song],
				playing: true,
				playingIndex: 0,
				activeSong: song,
				retrieving: false,
				allRetrieved: false
			};

			setState(newState);

			setAction(QueueActions.START_PLAYLIST);

			return;
		}

		// Added song to a finished playlist
		if (isLast && !state.playing) {
			const newState = {
				playlistId: null,
				seed: null,
				shuffled: false,
				list: [...state.list, song],
				playing: true,
				playingIndex: state.playingIndex! + 1,
				activeSong: song,
				retrieving: false,
				allRetrieved: false
			};

			setState(newState);

			setAction(QueueActions.PLAY_SONG);

			return;
		}

		// Add a song to the end of the queue
		const newState = {
			...state,
			playlistId: null,
			seed: null,
			shuffled: false,
			list: [...state.list, song]
		};

		setState(newState);
	}

	function remove(songIndex: number) {
		// Removing last song from queue
		if (state.list.length === 1) {
			setState((prevState) => ({
				...prevState,
				playlistId: null,
				seed: null,
				shuffled: false,
				activeSong: null,
				playing: false
			}));

			setAction(QueueActions.CLOSE_PLAYLIST);

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
				setState((prevState) => ({
					...prevState,
					list: prevState.list.filter((_, i) => i !== songIndex),
					activeSong: prevState.list[prevState.playingIndex! + 1]
				}));

				setAction(QueueActions.NEXT_SONG);

				return;
			}

			// Finish playlist
			setState((prevState) => ({ ...prevState, playing: false }));

			setAction(QueueActions.FINISH_PLAYLIST);

			return;
		}
	}

	async function shuffle() {
		if (state.retrieving) {
			return;
		}

		// Enabling shuffle
		if (!state.shuffled) {
			if (state.playlistId) {
				setState((prevState) => ({
					...prevState,
					list: [prevState.activeSong!],
					shuffled: true,
					playingIndex: 0,
					retrieving: true
				}));

				const seed = generateRandomString();

				try {
					const { songs } = await API.User.getPlaylistSongs(state.playlistId, {
						seed,
						isPresent: true
					});

					setState((prevState) => ({
						...prevState,
						seed,
						list: [prevState.activeSong!, ...songs],
						allRetrieved: false
					}));

					setAction(QueueActions.SHUFFLE_PLAYLIST);
				} catch (error) {
					console.error(error);

					setState((prevState) => ({ ...prevState, seed: null, shuffled: false, retrieving: false }));
				} finally {
					setState((prevState) => ({ ...prevState, retrieving: false }));
				}
			} else {
				setState((prevState) => ({
					...prevState,
					shuffled: true,
					list: [
						prevState.activeSong!,
						...shuffleArray(prevState.list.filter((_, i) => i !== prevState.playingIndex))
					],
					playingIndex: 0
				}));

				setAction(QueueActions.SHUFFLE_PLAYLIST);
			}
		} else {
			if (state.playlistId) {
				setState((prevState) => ({
					...prevState,
					shuffled: false,
					list: [prevState.activeSong!],
					playingIndex: 0,
					retrieving: true
				}));

				try {
					const { songs } = await API.User.getPlaylistSongs(state.playlistId, {
						cursor: state.activeSong!.id,
						isPresent: true
					});

					setState((prevState) => ({
						...prevState,
						seed: null,
						list: [prevState.activeSong!, ...songs],
						allRetrieved: false
					}));

					setAction(QueueActions.SHUFFLE_PLAYLIST);
				} catch (error) {
					console.error(error);
				} finally {
					setState((prevState) => ({ ...prevState, retrieving: false }));
				}
			} else {
				setState((prevState) => ({
					...prevState,
					shuffled: false
				}));
			}
		}
	}

	const value = useMemo(
		() => ({ state, subscribe, retrieve, play, stop, previous, next, add, remove, shuffle }),
		[state]
	);

	return <QueueContext.Provider value={value}>{children}</QueueContext.Provider>;
};

export const useQueue = () => {
	return useContext(QueueContext);
};
