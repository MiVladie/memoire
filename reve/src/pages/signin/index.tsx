import React, { useState } from 'react';

import { PROJECT_NAME } from 'config/project';
import { AuthStorage } from 'interfaces/storage';
import { HeadFC, navigate } from 'gatsby';

import Authentication from 'containers/Authentication/Authentication';
import Form from 'containers/Form/Form';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import Storage from 'shared/Storage';
import Seo from 'hoc/Seo/Seo';

import useForm from 'hooks/useForm';

import * as API from 'api';

import * as classes from './SignIn.module.scss';

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

	async function submitHandler({ name, password }: SignInFields) {
		setLoading(true);

		try {
			const { user, token } = await API.Auth.signIn({ name, password });

			Storage.set<AuthStorage>({ user, token });

			navigate('/home');
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
					inputClassName={classes.Input}
					name='name'
					placeholder='johndoe@example.com'
					value={values.name}
					disabled={loading}
					onChange={handleChange}
					onFocus={handleFocus}
					autoComplete={false}
					error={errors.name}
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

				{error && <p className={classes.Error}>{error}</p>}

				<Button className={classes.Button} onClick={handleSubmit} loading={loading}>
					Sign In
				</Button>
			</Form>

			<div className={classes.Actions}>
				<Button onClick={signUpHandler} className={classes.Action} ghost>
					i don't have an account
				</Button>

				<div className={classes.Separation} />

				<Button onClick={recoverHandler} className={classes.Action} ghost>
					help me recover account
				</Button>
			</div>
		</Authentication>
	);
};

export default SignIn;

export const Head: HeadFC = () => <Seo>Sign In</Seo>;
