export function convertSecondsToFormat(seconds: number) {
	return new Date(seconds * 1000).toISOString().substring(14, 19);
}

export async function delay(seconds: number): Promise<null> {
	return await new Promise((resolve) => setTimeout(() => resolve(null), seconds * 1000));
}
