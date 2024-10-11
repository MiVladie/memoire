export function getQueryParam(url: string, param: string): string {
	const obj = new URL(url);

	const params = new URLSearchParams(obj.search);

	return params.get(param) || '';
}
