export default class Storage {
	public static get<T>(keys: (keyof T)[]): Partial<T> {
		const result: any = {};

		for (let key of keys) {
			const value = localStorage.getItem(key as string);

			result[key] = value ? JSON.parse(value) : undefined;
		}

		return result;
	}

	public static set<T>(values: Partial<T>): void {
		for (const [key, value] of Object.entries(values)) {
			localStorage.setItem(key, JSON.stringify(value));
		}
	}

	public static remove<T>(items: (keyof T)[]): void {
		for (let key of items) {
			localStorage.removeItem(key as string);
		}
	}
}
