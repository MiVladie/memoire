import { SearchCollectionItem, User } from '@/interfaces/soundcloud';

export interface SearchPayload {
	query: string;
}

export interface SearchResponse {
	collection: SearchCollectionItem[];
}

export type GetUserResponse = User;
