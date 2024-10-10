import { TemplateMap } from '@/interfaces/mail';

export const SMTP_HOST = process.env.SMTP_HOST!;
export const SMTP_PORT = parseInt(process.env.SMTP_PORT!);
export const SMTP_FROM = process.env.SMTP_FROM;
export const SMTP_USER = process.env.SMTP_USER!;
export const SMTP_PASSWORD = process.env.SMTP_PASSWORD!;

export const VIEWS_PATH = 'views/';

export const EMAILS_PATH = 'emails/';
export const PARTIALS_PATH = 'partials/';

export const TEMPLATES: TemplateMap = {
	RECOVERY: {
		file: 'recovery',
		subject: 'Account Recovery | Mémoire'
	}
};
