export function excludeKeys<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
	let newObj = { ...obj };

	for (let key of keys) {
		delete newObj[key];
	}

	return newObj;
}
