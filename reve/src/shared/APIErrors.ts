import { ErrorMeta, ErrorResponseBody } from 'interfaces/error';

export default class APIError<M> extends Error {
	public message: string;
	public meta?: ErrorMeta<M>;

	constructor(body: ErrorResponseBody<M>) {
		super();

		this.message = body.message;
		this.meta = body.meta;
	}
}
