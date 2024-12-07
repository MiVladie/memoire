import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useAuth } from 'context/useAuth';
import { PROJECT_NAME } from 'config/project';

import { ReactComponent as Person } from 'assets/icons/person.svg';
import { ReactComponent as Email } from 'assets/icons/email.svg';
import { ReactComponent as Lock } from 'assets/icons/lock.svg';

import Authentication from 'containers/Authentication/Authentication';
import Form from 'containers/Form/Form';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import Seo from 'hoc/Seo/Seo';

import useForm from 'hooks/useForm';

import * as API from 'api';

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

	const { authenticate } = useAuth();

	const navigate = useNavigate();

	async function submitHandler({ name, email, password }: SignUpFields) {
		setLoading(true);

		try {
			const { user, token } = await API.Auth.signUp({ name, email, password });

			authenticate(user, token);

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
					icon={<Person />}
					name='name'
					placeholder='John Doe'
					value={values.name}
					disabled={loading}
					onChange={handleChange}
					onFocus={handleFocus}
					autoComplete={false}
					error={errors.name}
					className={classes.Input}
				/>

				<Input
					icon={<Email />}
					name='email'
					placeholder='johndoe@example.com'
					value={values.email}
					disabled={loading}
					onChange={handleChange}
					onFocus={handleFocus}
					autoComplete={false}
					error={errors.email}
					className={classes.Input}
				/>

				<Input
					icon={<Lock />}
					name='password'
					placeholder='password'
					value={values.password}
					disabled={loading}
					onChange={handleChange}
					onFocus={handleFocus}
					autoComplete={false}
					error={errors.password}
					className={classes.Input}
					secure
				/>

				<Input
					icon={<Lock />}
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
				<Button onClick={signInHandler} transparent>
					i already have an account
				</Button>
			</div>
		</Authentication>
	);
};

export default SignUp;

export const Head = () => <Seo>Sign Up</Seo>;
