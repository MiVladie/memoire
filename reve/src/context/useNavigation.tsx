import useScreen from 'hooks/useScreen';
import React, { useContext, createContext, useMemo, useState, useEffect } from 'react';

interface State {
	menuVisible: boolean;
	queueVisible: boolean;
	queueActive: boolean;
	queueExpanded: boolean;
}

interface Context {
	state: State;
	toggleMenu: (overwrite?: boolean) => void;
	toggleQueue: (overwrite?: boolean) => void;
	expandQueue: (overwrite?: boolean) => void;
	activateQueue: (overwrite?: boolean) => void;
}

const defaultState: State = {
	menuVisible: false,
	queueVisible: false,
	queueActive: false,
	queueExpanded: false
};

const NavigationContext = createContext<Context>({} as Context);

export const NavigationProvider = ({ children }: any) => {
	const [state, setState] = useState<State>(defaultState);

	const { isDesktop } = useScreen();

	useEffect(() => {
		if (isDesktop && state.queueExpanded) {
			expandQueue(false);
		}

		if (isDesktop && state.queueVisible) {
			toggleQueue();
		}
	}, [isDesktop, state.queueVisible]);

	function toggleMenu(overwrite?: boolean) {
		setState((prevState) => ({ ...prevState, menuVisible: overwrite ?? !prevState.menuVisible }));
	}

	function activateQueue(overwrite?: boolean) {
		setState((prevState) => ({ ...prevState, queueActive: overwrite ?? !prevState.queueActive }));
	}

	function toggleQueue(overwrite?: boolean) {
		setState((prevState) => ({ ...prevState, queueVisible: overwrite ?? !prevState.queueVisible }));
	}

	function expandQueue(overwrite?: boolean) {
		if (isDesktop && (overwrite ?? !state.queueExpanded)) {
			return;
		}

		setState((prevState) => ({ ...prevState, queueExpanded: overwrite ?? !prevState.queueExpanded }));
	}

	const value = useMemo(() => ({ state, toggleMenu, activateQueue, toggleQueue, expandQueue }), [state]);

	return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
};

export const useNavigation = () => {
	return useContext(NavigationContext);
};
