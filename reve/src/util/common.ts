import { Device } from 'interfaces/common';

export function isDevice(device: Device): boolean {
	const userAgent = navigator.userAgent;

	switch (device) {
		case Device.iOS:
			return /iPhone|iPad|iPod/.test(userAgent);

		case Device.Android:
			return /Android/.test(userAgent);

		default:
			return true;
	}
}

export function shuffleArray<T>(array: T[]): T[] {
	// Create a copy of the array to avoid mutating the original
	const shuffledArray = [...array];

	// Iterate through the array from the last element to the second element
	for (let i = shuffledArray.length - 1; i > 0; i--) {
		// Get a random index from 0 to i
		const randomIndex = Math.floor(Math.random() * (i + 1));

		// Swap the current element with the random element
		[shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
	}

	return shuffledArray;
}

export function generateRandomString(length: number = 16): string {
	let seed = '';

	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		seed += characters[randomIndex];
	}

	return seed;
}
