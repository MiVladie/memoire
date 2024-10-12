import { RetrieveResponse } from 'apis/platform/types';
import { API } from 'constants/api';

import Request from 'shared/Request';

export function retrieve(): Promise<RetrieveResponse> {
	return Request.get<RetrieveResponse>(API + '/platforms');
}
