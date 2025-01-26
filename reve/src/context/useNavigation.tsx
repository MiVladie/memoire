import React, { useContext, createContext, useMemo, useState } from 'react';

interface State {
	menuVisible: boolean;
	queueVisible: boolean;
}

interface Context {
	state: State;
	toggleMenu: (overwrite?: boolean) => void;
	toggleQueue: (overwrite?: boolean) => void;
}

const defaultState: State = {
	menuVisible: false,
	queueVisible: false
};

const NavigationContext = createContext<Context>({} as Context);

export const NavigationProvider = ({ children }: any) => {
	const [state, setState] = useState<State>(defaultState);

	function toggleMenu(overwrite?: boolean) {
		setState((prevState) => ({ ...prevState, menuVisible: overwrite ?? !prevState.menuVisible }));
	}

	function toggleQueue(overwrite?: boolean) {
		setState((prevState) => ({ ...prevState, queueVisible: overwrite ?? !prevState.queueVisible }));
	}

	const value = useMemo(() => ({ state, toggleMenu, toggleQueue }), [state]);

	return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
};

export const useNavigation = () => {
	return useContext(NavigationContext);
};
