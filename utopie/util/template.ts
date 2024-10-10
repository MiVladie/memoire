import { Payload, Type } from '@/interfaces/mail';
import { Path } from '@/constants';

import path from 'path';
import ejs from 'ejs';

export async function renderTemplate<T extends Type>(name: T, data: Payload[T]): Promise<string> {
	const templatePath = path.join(Path.Views.emails, name + '.ejs');
	const basePath = path.join(Path.Views.partials, 'base.ejs');

	try {
		const body = await ejs.renderFile(templatePath, data);
		const content = await ejs.renderFile(basePath, { body });

		return content;
	} catch (error: any) {
		throw new Error(error);
	}
}
