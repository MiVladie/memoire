import { ResponseBody } from 'interfaces/api';
import { Platform } from 'interfaces/models';

export interface RetrieveResponse extends ResponseBody {
	platforms: Platform[];
}
