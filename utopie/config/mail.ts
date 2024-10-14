import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST!,
	port: parseInt(process.env.SMTP_PORT!),
	secure: true,
	from: process.env.SMTP_FROM,
	auth: {
		user: process.env.SMTP_USER!,
		pass: process.env.SMTP_PASSWORD!
	}
});
