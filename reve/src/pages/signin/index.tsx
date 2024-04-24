import React, { useState } from 'react';

import { PROJECT_NAME } from 'config/constants';
import { HeadFC, navigate } from 'gatsby';
import { delay } from 'utils/date';

import Authentication from 'containers/Authentication/Authentication';
import Form from 'containers/Form/Form';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import Seo from 'hoc/Seo/Seo';
import useForm from 'hooks/useForm';

import * as classes from './SignIn.module.scss';

type SignInFields = {
	email: string;
	password: string;
};

const SignIn = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>();

	const { values, errors, handleChange, handleFocus, handleSubmit } = useForm<SignInFields>({
		initialValues: {
			email: '',
			password: ''
		},
		rules: {
			email: {
				required: true
			},
			password: {
				required: true
			}
		},
		onSubmit: submitHandler,
		onRefill: () => setError(undefined)
	});

	async function submitHandler() {
		setLoading(true);

		await delay(2);

		navigate('/home');
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
