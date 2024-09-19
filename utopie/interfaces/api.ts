import { ErrorType, ErrorMeta } from './error';

export interface ResponseBody {
	message: string;
}

export interface ErrorResponseBody {
	type: ErrorType;
	status: number;
	message: string;
	meta?: ErrorMeta;
	stack?: string;
}
