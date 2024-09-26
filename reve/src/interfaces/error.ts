export type ErrorType = 'MEMOIRE' | 'INTERNAL' | 'NETWORK' | 'UNKNOWN';
export type ErrorMeta<M> = Partial<M> | undefined;

export interface ErrorResponseBody<M> {
	type: ErrorType;
	status: number;
	message: string;
	meta?: ErrorMeta<M>;
}
