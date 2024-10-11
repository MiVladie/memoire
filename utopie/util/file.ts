import fs from 'fs';

export function writeToFile(filename: string, data: any) {
	fs.writeFile(`logs/${filename}.json`, JSON.stringify(data, null, 2), (err) => {
		if (err) {
			console.error('Error writing to file:', err);
		}
	});
}

export function extractFileExtension(filename: string): string {
	return filename.split('.')[filename.split('.').length - 1].toLowerCase();
}

export function convertMegaBytesToBytes(mb: number): number {
	return 1024 * 1024 * mb;
}

export function deleteFile(path: string): void {
	fs.unlink(path, (err) => {
		if (err) {
			throw new Error(err.message);
		}
	});
}
