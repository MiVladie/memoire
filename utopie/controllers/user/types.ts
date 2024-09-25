import { RequestHandler } from 'express';
import { ResponseBody, WithUserLocals } from '@/interfaces/api';

export interface PatchUpdateRequestBody {
	name?: string;
}

export type PatchUpdateHandler = RequestHandler<unknown, ResponseBody, PatchUpdateRequestBody, unknown, WithUserLocals>;
