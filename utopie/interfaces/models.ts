export interface User {
	id: number;
	name: string;
	email: string;
	password: string;
	image: string | null;
	createdAt: Date;
}

export interface Recovery {
	id: number;
	code: string;
	expiresAt: Date;
	userId: number;
}

export interface Platform {
	id: number;
	name: string;
	theme: string;
}
