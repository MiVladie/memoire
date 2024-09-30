export function isPath(path: string, paths: string[]) {
	return paths.some((p) => p.replaceAll('/', '') === path.replaceAll('/', ''));
}
