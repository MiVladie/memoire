import { SendParams, SendType, SendRecoveryParams, SendRecoveryType } from '@/services/mail/types';
import { renderTemplate } from '@/util/template';
import { Mail } from '@/constants';

import Mailer from '@/shared/Mailer';

import * as Jobs from '@/jobs';

const mailer = new Mailer();

const MAIL_QUEUE = new Jobs.Mail();

export async function send({ recipient, subject, content }: SendParams): Promise<SendType> {
	await mailer.send(recipient, subject, content);
}

export async function sendRecovery({ recipient, code }: SendRecoveryParams): Promise<SendRecoveryType> {
	const content = await renderTemplate(Mail.Recovery.file, { code });

	await MAIL_QUEUE.send({ recipient, subject: Mail.Recovery.subject, content });
}
