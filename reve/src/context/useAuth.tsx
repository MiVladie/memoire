import React, { useContext, createContext, useMemo } from 'react';

import { AuthStorage } from 'interfaces/storage';
import { User } from 'interfaces/models';

import Storage from 'config/storage';
import useStorage from 'hooks/useStorage';

interface Context {
	state: AuthStorage;
	authenticate: (user: User, token: string) => void;
	update: (user: Partial<User>) => void;
	clear: () => void;
}

const defaultState: AuthStorage = {
	user: null,
	token: null
};

const AuthContext = createContext<Context>({} as Context);

export const AuthProvider = ({ children }: any) => {
	const { state, setState } = useStorage(Storage.AUTH, defaultState);

	function authenticate(user: User, token: string) {
		setState({ user, token });
	}

	function update(user: Partial<User>) {
		setState({ ...state, user: { ...state.user!, ...user } });
	}

	function clear() {
		setState(defaultState);
	}

	const value = useMemo(() => ({ state, authenticate, update, clear }), [state]);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};
