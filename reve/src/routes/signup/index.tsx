import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { PROJECT_NAME } from 'config/project';
import { AuthStorage } from 'interfaces/storage';

import Authentication from 'containers/Authentication/Authentication';
import Form from 'containers/Form/Form';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import Storage from 'shared/Storage';
import Seo from 'hoc/Seo/Seo';

import useForm from 'hooks/useForm';

import * as API from 'apis';

import classes from './SignUp.module.scss';

type SignUpFields = {
	name: string;
	email: string;
	password: string;
	repeatPassword: string;
};

const SignUp = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>();

	const navigate = useNavigate();

	const { values, errors, handleChange, handleFocus, handleSubmit, handleErrors } = useForm<SignUpFields>({
		initialValues: {
			name: '',
			email: '',
			password: '',
			repeatPassword: ''
		},
		rules: {
			name: {
				required: true
			},
			email: {
				required: true
			},
			password: {
				required: true,
				isPassword: true
			},
			repeatPassword: {
				required: true,
				matchField: 'password'
			}
		},
		onSubmit: submitHandler,
		onRefill: () => setError(undefined)
	});

	async function submitHandler({ name, email, password }: SignUpFields) {
		setLoading(true);

		try {
			const { user, token } = await API.Auth.signUp({ name, email, password });

			Storage.set<AuthStorage>({ user, token });

			navigate('/');
		} catch (error: any) {
			handleChange('', 'password');
			handleChange('', 'repeatPassword');

			if (error.meta) {
				handleErrors(error.meta);
			} else {
				setError(error.message);
			}

			setLoading(false);
		}
	}

	function signInHandler() {
		navigate('/signin');
	}

	return (
		<Authentication name={PROJECT_NAME} description='Never let go of your gems'>
			<Form className={classes.Form}>
				<Input
					inputClassName={classes.Input}
					name='name'
					placeholder='John Doe'
					value={values.name}
					disabled={loading}
					onChange={handleChange}
					onFocus={handleFocus}
					autoComplete={false}
					error={errors.name}
				/>

				<Input
					inputClassName={classes.Input}
					name='email'
					placeholder='johndoe@example.com'
					value={values.email}
					disabled={loading}
					onChange={handleChange}
					onFocus={handleFocus}
					autoComplete={false}
					error={errors.email}
				/>

				<Input
					inputClassName={classes.Input}
					name='password'
					placeholder='password'
					value={values.password}
					disabled={loading}
					onChange={handleChange}
					onFocus={handleFocus}
					autoComplete={false}
					error={errors.password}
					secure
				/>

				<Input
					inputClassName={classes.Input}
					name='repeatPassword'
					placeholder='repeat password'
					value={values.repeatPassword}
					disabled={loading}
					onChange={handleChange}
					onFocus={handleFocus}
					autoComplete={false}
					error={errors.repeatPassword}
					secure
				/>

				{error && <p className={classes.Error}>{error}</p>}

				<Button className={classes.Button} onClick={handleSubmit} loading={loading}>
					Sign Up
				</Button>
			</Form>

			<div className={classes.Actions}>
				<Button onClick={signInHandler} className={classes.Action} ghost>
					i already have an account
				</Button>
			</div>
		</Authentication>
	);
};

export default SignUp;

export const Head = () => <Seo>Sign Up</Seo>;
