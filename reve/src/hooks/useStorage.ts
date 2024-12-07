import { useState } from 'react';

const useStorage = <T>(key: string, defaultValue?: T) => {
	const [state, updateState] = useState<T>(() => {
		try {
			const value = localStorage.getItem(key);

			if (value) {
				return JSON.parse(value) as T;
			}

			localStorage.setItem(key, defaultValue ? JSON.stringify(defaultValue) : '');

			return defaultValue as T;
		} catch (err) {
			return defaultValue as T;
		}
	});

	function setState(value: T) {
		try {
			localStorage.setItem(key, JSON.stringify(value));
		} catch (err) {
			console.log(err);
		}

		updateState(value);
	}

	return { state, setState };
};

export default useStorage;
