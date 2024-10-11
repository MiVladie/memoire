import { SendParams, SendType } from '@/services/mail/types';

import Mailer from '@/shared/Mailer';

const mailer = new Mailer();

export async function send({ recipient, subject, content }: SendParams): Promise<SendType> {
	await mailer.send(recipient, subject, content);
}
