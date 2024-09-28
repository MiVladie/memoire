import { ResponseBody } from 'interfaces/api';
import { User } from 'interfaces/models';

export interface UpdatePayload {
	name: string;
}

export interface UpdateResponse extends ResponseBody {
	user: User;
}

export interface UpdatePasswordPayload {
	password: string;
	newPassword: string;
}

export interface UpdatePasswordResponse extends ResponseBody {}

export interface UploadImagePayload {
	image: File;
}

export interface UploadImageResponse extends ResponseBody {
	user: User;
}

export interface RemoveImageResponse extends ResponseBody {
	user: User;
}
