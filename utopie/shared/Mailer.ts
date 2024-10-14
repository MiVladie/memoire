import { transporter } from '@/config/mail';
import { writeToFile } from '@/util/file';

import nodemailer from 'nodemailer';

import * as Server from '@/config/server';

export default class Mailer {
	private transporter: nodemailer.Transporter;

	constructor() {
		this.transporter = transporter;

		this.transporter.verify((error) => {
			if (Server.ENV !== 'production') {
				return;
			}

			if (error) {
				writeToFile('mailer', {
					message: 'Mail configuration error:',
					error,
					config: {
						host: process.env.SMTP_HOST!,
						port: parseInt(process.env.SMTP_PORT!),
						secure: false,
						from: process.env.SMTP_FROM,
						auth: {
							user: process.env.SMTP_USER!,
							pass: process.env.SMTP_PASSWORD!
						}
					}
				});
			} else {
				writeToFile('mailer', { message: 'Mail transport is ready to send email' });
			}
		});
	}

	public async send(recipient: string, subject: string, content: string) {
		if (Server.ENV !== 'production') {
			console.log('Sending mail to: ' + recipient);

			return;
		}

		await this.transporter.sendMail({ to: recipient, subject, html: content });
	}
}
