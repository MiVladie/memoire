import { Message } from '@/constants';
import { ErrorMeta } from '@/interfaces/error';

import APIError, { Errors } from '@/shared/APIError';
import joi from 'joi';

export function validate<T>(schema: joi.StrictSchemaMap<T>, data: T) {
	const { error } = joi
		.object(schema)
		.messages(Message.JOI_VALIDATION_MESSAGES)
		.validate(data, { abortEarly: false });

	if (!error) {
		return;
	}

	const fields: ErrorMeta = {};

	error?.details.forEach(({ context, message }) => {
		const key: string = context!.key!;
		const label: string = message;

		fields[key] = label;
	});

	throw new APIError(Errors.VALIDATION, { meta: fields });
}

export function objectsMatch(a: object, b: object) {
	const commonKeys = Object.keys(a).filter((key) => key in b);

	for (const key of commonKeys) {
		// @ts-ignore
		if (a[key] !== b[key]) {
			return false;
		}
	}

	return true;
}
