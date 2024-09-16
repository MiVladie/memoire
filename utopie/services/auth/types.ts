export interface SignInParams {
	name: string;
	password: string;
}

export interface SignUpParams {
	name: string;
	email: string;
	password: string;
}

export interface AuthType {
	user: {
		id: number;
		name: string;
		email: string;
		image: string | null;
	};
	token: string;
}
