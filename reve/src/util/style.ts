export function hexToRGBA(hex: string, opacity?: number): [number, number, number, number] {
	hex = hex.replace(/^#/, '');

	// Handle shorthand notation (e.g., "FFF" -> "FFFFFF")
	if (hex.length === 3) {
		hex = hex
			.split('')
			.map((char) => char + char)
			.join('');
	}

	// Convert hex to RGB values
	const r = parseInt(hex.slice(0, 2), 16);
	const g = parseInt(hex.slice(2, 4), 16);
	const b = parseInt(hex.slice(4, 6), 16);

	return [r, g, b, opacity ?? 1];
}

export function rgbToHEX(r: number, g: number, b: number): string {
	return (
		'#' +
		[r, g, b]
			.map((val) => val.toString(16).padStart(2, '0'))
			.join('')
			.toUpperCase()
	);
}
