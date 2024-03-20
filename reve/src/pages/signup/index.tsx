import React, { useState } from 'react';

import { PROJECT_NAME } from 'config/constants';
import { HeadFC, Link } from 'gatsby';

import Authentication from 'containers/Authentication/Authentication';
import Form from 'containers/Form/Form';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import Seo from 'hoc/Seo/Seo';
import useForm from 'hooks/useForm';

import * as classes from './SignUp.module.scss';

type SignUpFields = {
	name: string;
	email: string;
	password: string;
	repeatPassword: string;
};

const SignUp = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>();

	const { values, errors, handleChange, handleFocus, handleSubmit } = useForm<SignUpFields>({
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

	async function submitHandler() {
		setLoading(true);
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
				<Link to='/signin' className={classes.Text}>
					i already have an account
				</Link>
			</div>
		</Authentication>
	);
};

export default SignUp;

export const Head: HeadFC = () => <Seo>Sign Up</Seo>;
