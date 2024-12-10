import React, { useContext, createContext, useMemo, useState } from 'react';

interface State {
	active: boolean;
	playing: boolean;
}

interface Context {
	state: State;
	activate: () => void;
	play: () => void;
}

const defaultState: State = {
	active: false,
	playing: false
};

const QueueContext = createContext<Context>({} as Context);

export const QueueProvider = ({ children }: any) => {
	const [state, setState] = useState<State>(defaultState);

	function activate() {
		setState((prevState) => ({
			...prevState,
			active: !prevState.active,
			playing: !prevState.active
		}));
	}

	function play() {
		setState((prevState) => ({ ...prevState, playing: !prevState.playing }));
	}

	const value = useMemo(() => ({ state, activate, play }), [state]);

	return <QueueContext.Provider value={value}>{children}</QueueContext.Provider>;
};

export const useQueue = () => {
	return useContext(QueueContext);
};
