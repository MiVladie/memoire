import { SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_USER } from '@/constants/mail';

import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
	host: SMTP_HOST,
	port: SMTP_PORT,
	secure: false,
	auth: {
		user: SMTP_USER,
		pass: SMTP_PASSWORD
	}
});
