export interface UserDTO {
	id: number;
	name: string;
	email: string;
	image: string | null;
	soundcloudId: number | null;
}

export interface UserTokenDTO {
	id: number;
}
