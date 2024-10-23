import { RequestHandler } from 'express';
import { ResponseBody } from '@/interfaces/api';

interface GetMediaResponseBody extends ResponseBody {
	media: string;
}

export interface GetMediaParams {
	id: string;
}

export type GetMediaHandler = RequestHandler<GetMediaParams, GetMediaResponseBody, unknown, unknown>;
