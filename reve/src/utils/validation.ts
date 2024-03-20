import { IRule, TLongRuleExpression, IValues } from 'interfaces/validation';

const getRule = (rules: IRule, name: keyof IRule) => {
	let result;

	if ((rules[name] as TLongRuleExpression<any>)?.value !== undefined) {
		result = (rules[name] as TLongRuleExpression<any>).value;
	} else {
		result = rules[name];
	}

	return { result };
};

export const validateField = async <T extends IValues>(
	value: string,
	rules: IRule,
	fields?: T
): Promise<string | false> => {
	let name: keyof IRule;

	for (name in rules) {
		const { result } = getRule(rules, name);

		switch (name) {
			case 'required':
				if (result && isEmpty(value)) return 'This field is required!';
				break;

			case 'isEmail':
				if (result && !isValidEmail(value)) return 'This is not a valid email address!';
				break;

			case 'isPassword':
				if (result && !isValidPassword(value)) return 'The password must be between 8 and 15 characters long!';
				break;

			case 'matchField':
				if (fields && !areSameValues(value, fields[result])) return 'Fields do not match!';
				break;

			case 'custom':
				if (typeof result === 'function') {
					let res = await result(value);
					if (res) return res || 'Invalid value!';
				}
				break;

			default:
				break;
		}
	}

	return false;
};

export const isValidEmail = (value: string): boolean => {
	var re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	return re.test(String(value).toLowerCase());
};

export const isValidPhone = (value: string): boolean => {
	var re = /^\+?([0-9 ]{5,15})$/;

	return re.test(String(value).toLowerCase());
};

export const isValidPassword = (value: string): boolean => {
	return value.length >= 8 && value.length <= 15;
};

export const areSameValues = (a: string, b: string): boolean => {
	return a === b;
};

export const isEmpty = (value: string): boolean => {
	return value == null || value === '' || value.trim() === '';
};
