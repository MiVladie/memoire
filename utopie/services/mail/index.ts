import { SendParams, SendType, SendRecoveryParams, SendRecoveryType } from '@/services/mail/types';
import { renderTemplate } from '@/util/template';
import { TEMPLATES } from '@/constants/mail';

import Mail from '@/shared/Mail';

import * as Jobs from '@/jobs';

const mailer = new Mail();

const MAIL_QUEUE = new Jobs.Mail();

export async function send({ recipient, subject, content }: SendParams): Promise<SendType> {
	await mailer.send(recipient, subject, content);
}

export async function sendRecovery({ recipient, code }: SendRecoveryParams): Promise<SendRecoveryType> {
	const content = await renderTemplate(TEMPLATES.RECOVERY.file, { code });

	await MAIL_QUEUE.send({ recipient, subject: TEMPLATES.RECOVERY.subject, content });
}
