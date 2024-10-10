import { Payload, Type } from '@/interfaces/mail';

import path from 'path';
import ejs from 'ejs';

import * as Mail from '@/constants/mail';

export async function renderTemplate<T extends Type>(name: T, data: Payload[T]): Promise<string> {
	const templatePath = path.join(Mail.VIEWS_PATH, Mail.EMAILS_PATH, name + '.ejs');
	const basePath = path.join(Mail.VIEWS_PATH, Mail.PARTIALS_PATH, 'base.ejs');

	try {
		const body = await ejs.renderFile(templatePath, data);
		const content = await ejs.renderFile(basePath, { body });

		return content;
	} catch (error: any) {
		throw new Error(error);
	}
}
