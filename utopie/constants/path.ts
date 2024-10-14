import path from 'path';

export const BASE_URL = process.env.BASE_URL!;

export const SHARED_DIR = process.env.SHARED_DIR!;

export const Shared = {
	images: path.join(SHARED_DIR, '/images')
};

export const Views = {
	emails: 'views/emails',
	partials: 'views/partials'
};
