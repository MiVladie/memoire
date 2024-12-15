import React, { useState } from 'react';

import { ReactComponent as Lock } from 'assets/icons/lock.svg';

import Content from 'containers/Content/Content';
import Form from 'containers/Form/Form';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import useForm from 'hooks/useForm';

import * as API from 'api';

import classes from './Password.module.scss';

type PasswordFields = {
	password: string;
	newPassword: string;
};

interface Props {
	className?: string;
}

const Password = ({ className }: Props) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>();

	const { values, errors, handleChange, handleFocus, handleSubmit, handleErrors } = useForm<PasswordFields>({
		initialValues: {
			password: '',
			newPassword: ''
		},
		rules: {
			password: {
				required: true,
				isPassword: true
			},
			newPassword: {
				required: true,
				isPassword: true
			}
		},
		onSubmit: submitHandler,
		onRefill: () => setError(undefined)
	});

	async function submitHandler({ password, newPassword }: PasswordFields) {
		setLoading(true);

		try {
			await API.User.updatePassword({ password, newPassword });
		} catch (error: any) {
			if (error.meta) {
				handleErrors(error.meta);
			} else {
				setError(error.message);
			}
		} finally {
			handleChange('', 'password');
			handleChange('', 'newPassword');

			setLoading(false);
		}
	}

	return (
		<Form className={classes.Form}>
			<Input
				icon={<Lock />}
				name='password'
				placeholder='Password'
				value={values.password}
				disabled={loading}
				onChange={handleChange}
				onFocus={handleFocus}
				autoComplete={false}
				error={errors.password}
				className={classes.Input}
				secure
				dark
			/>

			<Input
				icon={<Lock />}
				name='newPassword'
				placeholder='New Password'
				value={values.newPassword}
				disabled={loading}
				onChange={handleChange}
				onFocus={handleFocus}
				autoComplete={false}
				error={errors.newPassword}
				secure
				dark
			/>

			{error && <p className={classes.Error}>{error}</p>}

			<Button className={classes.Button} onClick={handleSubmit} loading={loading}>
				Save
			</Button>
		</Form>
	);
};

export default Password;
