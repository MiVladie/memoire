import { GetMediaResponse } from 'api/song/types';
import { API } from 'constants/api';

import Request from 'shared/Request';

export function getMedia(id: number): Promise<GetMediaResponse> {
	return Request.get<GetMediaResponse>(API + `/songs/${id}/media`);
}
