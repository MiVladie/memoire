import { transporter } from '@/config/mail';

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
				console.log('Mail configuration error:');
				console.log(error);
			} else {
				console.log('Mail transport is ready to send email');
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
