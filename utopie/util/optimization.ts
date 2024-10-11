import { v7 as uuidv7 } from 'uuid';

export function excludeKeys<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
	let newObj = { ...obj };

	for (let key of keys) {
		delete newObj[key];
	}

	return newObj;
}

export function generateNumber(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export function generateUniqueString(): string {
	return uuidv7();
}

export function intoChunks<T extends string | number>(array: T[], size: number = 50): T[][] {
	if (size <= 0) {
		throw new Error('Chunk size must be greater than 0');
	}

	const result: T[][] = [];

	for (let i = 0; i < array.length; i += size) {
		const chunk = array.slice(i, i + size);
		result.push(chunk);
	}

	return result;
}
