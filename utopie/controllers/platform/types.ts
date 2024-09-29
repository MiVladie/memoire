import { RequestHandler } from 'express';
import { ResponseBody } from '@/interfaces/api';
import { PlatformDTO } from '@/dtos/platform/types';

interface GetResponseBody extends ResponseBody {
	platforms: PlatformDTO[];
}

export type GetHandler = RequestHandler<unknown, GetResponseBody>;
