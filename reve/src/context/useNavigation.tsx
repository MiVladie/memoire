import React, { useContext, createContext, useMemo, useState } from 'react';

interface State {
	menuVisible: boolean;
}

interface Context {
	state: State;
	toggle: (overwrite?: boolean) => void;
}

const defaultState: State = {
	menuVisible: false
};

const NavigationContext = createContext<Context>({} as Context);

export const NavigationProvider = ({ children }: any) => {
	const [state, setState] = useState<State>(defaultState);

	function toggle(overwrite?: boolean) {
		setState((prevState) => ({ ...prevState, menuVisible: overwrite ?? !prevState.menuVisible }));
	}

	const value = useMemo(() => ({ state, toggle }), [state]);

	return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
};

export const useNavigation = () => {
	return useContext(NavigationContext);
};
