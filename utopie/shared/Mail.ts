import { transporter } from '@/config/mail';
import { SMTP_FROM } from '@/constants/mail';
import { Server } from '@/constants';

import nodemailer from 'nodemailer';

export default class Mail {
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

		await this.transporter.sendMail({ from: SMTP_FROM, to: recipient, subject, html: content });
	}
}
