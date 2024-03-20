import { useState } from 'react';

import { TLongRuleExpression, TRules, IValues } from 'interfaces/validation';
import { validateField } from 'utils/validation';

type Error<X> = { [key in keyof X]: string };

interface Props<T extends IValues> {
	initialValues: T;
	rules?: TRules<T>;
	onSubmit?: (values: T) => void;
	onRefill?: () => void;
}

const useForm = <T extends IValues>({ initialValues, rules, onSubmit, onRefill }: Props<T>) => {
	const getInitialErrors = () => {
		return Object.keys(initialValues).reduce((acc: any, curr) => ((acc[curr] = ''), acc), {}) as Error<T>;
	};

	const [submitted, setSubmitted] = useState<boolean>(false);
	const [values, setValues] = useState<T>(initialValues);
	const [errors, setErrors] = useState<Error<T>>(getInitialErrors);

	const handleChange = (value: (typeof values)[keyof T], key: keyof T) => {
		if (errors[key]) {
			setErrors((prevState) => ({ ...prevState, [key]: '' }));
		}

		setValues((prevState: T) => ({ ...prevState, [key]: value }));
	};

	const handleFocus = (key: keyof T) => {
		if (submitted && !!onRefill) {
			setSubmitted(false);
			onRefill();
		}

		let newErrors = {
			[key]: ''
		};

		for (let rule in rules) {
			if (
				rules[rule]?.matchField === key ||
				(rules[rule]?.matchField as TLongRuleExpression<any>)?.value === key
			) {
				newErrors = {
					...newErrors,
					[rule]: ''
				};
			}
		}

		setErrors((prevState) => ({ ...prevState, ...newErrors }));
	};

	const handleBlur = async (key: keyof T) => {
		if (!rules) return;

		const error = await validateField(values[key], rules[key]!, values);

		if (error) setErrors((prevState) => ({ ...prevState, [key]: error }));
	};

	const handleSubmit = async () => {
		if (!rules || !onSubmit) return;

		onRefill?.();

		let foundErrors = false;
		let newErrors: Error<T> = { ...errors };

		for (let field in values) {
			const error = await validateField<T>(values[field], rules[field]!, values);

			if (error) {
				foundErrors = true;

				newErrors = {
					...newErrors,
					[field]: error
				};
			}
		}

		if (foundErrors) {
			setErrors(newErrors);
			return;
		}

		setSubmitted(true);
		onSubmit(values);
	};

	const handleReset = () => {
		setValues(initialValues);
	};

	return { values, errors, handleChange, handleFocus, handleBlur, handleSubmit, handleReset };
};

export default useForm;
