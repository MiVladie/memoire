export interface SearchCollectionItem {
	id: number;
	permalink: string;
	kind: 'user' | 'track';
	avatar_url: string | null;
}

export interface User {
	id: number;
	username: string;
	description: string;
	avatar_url: string | null;
	permalink: string;
	created_at: string;
}
