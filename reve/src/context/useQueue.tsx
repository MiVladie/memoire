import React, { useContext, createContext, useMemo, useState } from 'react';

import { ISong } from 'interfaces/data';

interface State {
	active: boolean;
	list: ISong[];
	playingIndex: number | null;
	playing: boolean;
}

interface Context {
	state: State;
	enlist: (list: ISong[]) => void;
	play: (index?: number) => void;
	previous: () => void;
	next: () => void;
}

const defaultState: State = {
	active: false,
	list: [],
	playingIndex: null,
	playing: false
};

const QueueContext = createContext<Context>({} as Context);

export const QueueProvider = ({ children }: any) => {
	const [state, setState] = useState<State>(defaultState);

	function activate() {
		setState((prevState) => ({ ...prevState, active: !prevState.active }));
	}

	function enlist(list: ISong[], index?: number) {
		setState((prevState) => ({ ...prevState, active: true, list, playingIndex: index ?? 0, playing: true }));
	}

	function play(index?: number) {
		if (index !== undefined) {
			setState((prevState) => ({ ...prevState, playingIndex: index, playing: true }));
			return;
		}

		setState((prevState) => ({ ...prevState, playing: !prevState.playing }));
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

	const value = useMemo(() => ({ state, activate, enlist, play, previous, next }), [state]);

	return <QueueContext.Provider value={value}>{children}</QueueContext.Provider>;
};

export const useQueue = () => {
	return useContext(QueueContext);
};
