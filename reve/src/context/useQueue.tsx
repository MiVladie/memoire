import React, { useContext, createContext, useMemo, useState } from 'react';

interface State {
	active: boolean;
	viewing: boolean;
	playing: boolean;
}

interface Context {
	state: State;
	activate: () => void;
	play: () => void;
	view: () => void;
}

const defaultState: State = {
	active: false,
	viewing: false,
	playing: false
};

const QueueContext = createContext<Context>({} as Context);

export const QueueProvider = ({ children }: any) => {
	const [state, setState] = useState<State>(defaultState);

	function activate() {
		setState((prevState) => ({
			...prevState,
			active: !prevState.active,
			playing: !prevState.active,
			viewing: false
		}));
	}

	function play() {
		setState((prevState) => ({ ...prevState, playing: !prevState.playing }));
	}

	function view() {
		setState((prevState) => ({
			...prevState,
			viewing: !prevState.viewing
		}));
	}

	// function reset() {
	// 	setState({ active: false, viewing: false })
	// }

	const value = useMemo(() => ({ state, activate, play, view }), [state]);

	return <QueueContext.Provider value={value}>{children}</QueueContext.Provider>;
};

export const useQueue = () => {
	return useContext(QueueContext);
};
