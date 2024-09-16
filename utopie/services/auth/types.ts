export interface SignInParams {
	name: string;
	password: string;
}

export interface SignInType {
	user: {
		id: number;
		name: string;
		email: string;
		image: string | null;
	};
	token: string;
}
