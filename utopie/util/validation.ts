import { JOI_CUSTOM_MESSAGES } from '@/config/validation';

import joi from 'joi';

export function validate<T>(schema: joi.StrictSchemaMap<T>, data: T) {
	const { error } = joi.object(schema).messages(JOI_CUSTOM_MESSAGES).validate(data);

	if (error) {
		throw new Error(error.message);
	}
}
