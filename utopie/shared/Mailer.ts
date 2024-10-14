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
				writeToFile('mailer', { message: 'Mail configuration error:', error });
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
