import { QueryParams } from '@/interfaces/api';

export function paramify(params?: QueryParams): string {
	if (!params) return '';

	return (
		'?' +
		Object.keys(params)
			.filter((paramKey) => params[paramKey] != undefined)
			.map((paramKey) => {
				let key = encodeURIComponent(paramKey);

				if (Array.isArray(params[paramKey])) {
					let value = (params[paramKey]! as string[]).join(',');

					return `${key}[]=${value}`;
				} else {
					let value = encodeURIComponent(
						(typeof params[paramKey]! === 'boolean' ? +params[paramKey]! : params[paramKey]!) as string
					);

					return `${key}=${value}`;
				}
			})
			.join('&')
	);
}

export function getQueryParam(url: string, param: string): string {
	const obj = new URL(url);

	const params = new URLSearchParams(obj.search);

	return params.get(param) || '';
}
