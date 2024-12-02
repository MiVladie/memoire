import React, { createContext, useReducer } from 'react';

import { State, Action } from 'context/types/queue';
import { ISong } from 'interfaces/data';

import initialState from 'context/initialstates/queue';
import reducer from 'context/reducers/queue';

interface Store {
	state: State;
	load: (list: ISong[]) => void;
	playNext: () => void;
	play: () => void;
	pause: () => void;
	playPrevious: () => void;
	clear: () => void;
}

interface Props {
	children: React.ReactNode;
}

export const QueueContext = createContext<Store>({} as Store);

const QueueProvider = ({ children }: Props) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	function load(list: ISong[]) {
		dispatch({ type: Action.SET_QUEUE, payload: { list, currentId: list[0].id, playing: false } });
	}

	function play() {
		dispatch({ type: Action.UPDATE_QUEUE, payload: { playing: true } });
	}

	function pause() {
		dispatch({ type: Action.UPDATE_QUEUE, payload: { playing: false } });
	}

	function playPrevious() {
		const { list, currentId } = state as State;

		const currentIndex = list.findIndex((song) => song.id === currentId);

		if (currentIndex !== 0) {
			dispatch({ type: Action.UPDATE_QUEUE, payload: { currentId: list[currentIndex - 1].id } });
		}
	}

	function playNext() {
		const { list, currentId } = state as State;

		const currentIndex = list.findIndex((song) => song.id === currentId);

		if (currentIndex !== list.length - 1) {
			dispatch({ type: Action.UPDATE_QUEUE, payload: { currentId: list[currentIndex + 1].id } });
		}
	}

	function clear() {
		dispatch({ type: Action.DELETE_QUEUE });
	}

	return (
		<QueueContext.Provider value={{ state, load, play, pause, playNext, playPrevious, clear }}>
			{children}
		</QueueContext.Provider>
	);
};

export default QueueProvider;
