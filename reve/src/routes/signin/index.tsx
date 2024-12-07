import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { PROJECT_NAME } from 'config/project';
import { useAuth } from 'context/useAuth';

import { ReactComponent as Person } from 'assets/icons/person.svg';
import { ReactComponent as Lock } from 'assets/icons/lock.svg';

import Authentication from 'containers/Authentication/Authentication';
import Form from 'containers/Form/Form';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import Seo from 'hoc/Seo/Seo';

import useForm from 'hooks/useForm';

import * as API from 'api';

import classes from './SignIn.module.scss';

type SignInFields = {
	name: string;
	password: string;
};

const SignIn = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>();

	const { values, errors, handleChange, handleFocus, handleSubmit, handleErrors } = useForm<SignInFields>({
		initialValues: {
			name: '',
			password: ''
		},
		rules: {
			name: {
				required: true
			},
			password: {
				required: true
			}
		},
		onSubmit: submitHandler,
		onRefill: () => setError(undefined)
	});

	const { authenticate } = useAuth();

	const navigate = useNavigate();

	async function submitHandler({ name, password }: SignInFields) {
		setLoading(true);

		try {
			const { user, token } = await API.Auth.signIn({ name, password });

			authenticate(user, token);

			navigate('/');
		} catch (error: any) {
			handleChange('', 'password');

			if (error.meta) {
				handleErrors(error.meta);
			} else {
				setError(error.message);
			}

			setLoading(false);
		}
	}

	function signUpHandler() {
		navigate('/signup');
	}

	function recoverHandler() {
		navigate('/recover');
	}

	return (
		<Authentication name={PROJECT_NAME} description='Never let go of your gems'>
			<Form className={classes.Form}>
				<Input
					icon={<Person />}
					name='name'
					placeholder='johndoe@example.com'
					value={values.name}
					disabled={loading}
					onChange={handleChange}
					onFocus={handleFocus}
					autoComplete={false}
					error={errors.name}
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
					secure
				/>

				{error && <p className={classes.Error}>{error}</p>}

				<Button className={classes.Button} onClick={handleSubmit} loading={loading}>
					Sign In
				</Button>
			</Form>

			<div className={classes.Actions}>
				<Button onClick={signUpHandler} transparent>
					i don't have an account
				</Button>

				<div className={classes.Separation} />

				<Button onClick={recoverHandler} transparent>
					help me recover account
				</Button>
			</div>
		</Authentication>
	);
};

export default SignIn;

export const Head = () => <Seo>Sign In</Seo>;
