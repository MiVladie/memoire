import path from 'path';

export const BASE_URL = process.env.SERVER_PATH;

export const Shared = {
	shared: path.join(__dirname, 'shared'),
	images: path.join(__dirname, 'shared/images')
};

export const Views = {
	emails: 'views/emails',
	partials: 'views/partials'
};
