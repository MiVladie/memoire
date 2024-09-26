import React, { useState } from 'react';

import { HeadFC, navigate } from 'gatsby';

import Authentication from 'containers/Authentication/Authentication';
import Form from 'containers/Form/Form';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import Seo from 'hoc/Seo/Seo';
import useForm from 'hooks/useForm';

import * as API from 'api';

import * as classes from './Recover.module.scss';

type StepOneFields = {
	email: string;
};

type StepTwoFields = {
	code: string;
};

type StepThreeFields = {
	password: string;
	repeatPassword: string;
};

const Recover = () => {
	const [token, setToken] = useState<string>();

	const [step, setStep] = useState<number>(0);

	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>();

	const stepOneForm = useForm<StepOneFields>({
		initialValues: {
			email: ''
		},
		rules: {
			email: {
				isEmail: true,
				required: true
			}
		},
		onSubmit: sendHandler,
		onRefill: () => setError(undefined)
	});

	const stepTwoForm = useForm<StepTwoFields>({
		initialValues: {
			code: ''
		},
		rules: {
			code: {
				required: true
			}
		},
		onSubmit: verifyHandler,
		onRefill: () => setError(undefined)
	});

	const stepThreeForm = useForm<StepThreeFields>({
		initialValues: {
			password: '',
			repeatPassword: ''
		},
		rules: {
			password: {
				required: true,
				isPassword: true
			},
			repeatPassword: {
				required: true,
				matchField: 'password'
			}
		},
		onSubmit: saveHandler,
		onRefill: () => setError(undefined)
	});

	async function sendHandler({ email }: StepOneFields) {
		setLoading(true);

		try {
			await API.Auth.recover({ email });

			setStep(1);
		} catch (error: any) {
			stepOneForm.handleChange('', 'email');

			if (error.meta) {
				stepOneForm.handleErrors(error.meta);
			} else {
				setError(error.message);
			}
		} finally {
			setLoading(false);
		}
	}

	async function verifyHandler({ code }: StepTwoFields) {
		setLoading(true);

		try {
			const { token } = await API.Auth.verify({ code, email: stepOneForm.values.email });

			setToken(token);

			setStep(2);
		} catch (error: any) {
			stepTwoForm.handleChange('', 'code');

			if (error.meta) {
				stepTwoForm.handleErrors(error.meta);
			} else {
				setError(error.message);
			}
		} finally {
			setLoading(false);
		}
	}

	async function saveHandler({ password }: StepThreeFields) {
		setLoading(true);

		try {
			await API.Auth.reset({ password, token: token! });

			navigate('/signin');
		} catch (error: any) {
			stepThreeForm.handleChange('', 'password');
			stepThreeForm.handleChange('', 'repeatPassword');

			if (error.meta) {
				stepThreeForm.handleErrors(error.meta);
			} else {
				setError(error.message);
			}
		} finally {
			setLoading(false);
		}
	}

	return (
		<Authentication
			name='Recover'
			description={
				step === 0
					? 'Enter your email address'
					: step === 1
					? 'Enter the code sent to your email'
					: 'Create a new password'
			}>
			{step === 0 ? (
				<Form className={classes.Form}>
					<Input
						inputClassName={classes.Input}
						name='email'
						placeholder='johndoe@example.com'
						value={stepOneForm.values.email}
						disabled={loading}
						onChange={stepOneForm.handleChange}
						onFocus={stepOneForm.handleFocus}
						autoComplete={false}
						error={stepOneForm.errors.email}
					/>

					{error && <p className={classes.Error}>{error}</p>}

					<Button className={classes.Button} onClick={stepOneForm.handleSubmit} loading={loading}>
						Send
					</Button>
				</Form>
			) : step === 1 ? (
				<Form className={classes.Form}>
					<Input
						inputClassName={classes.Input}
						name='code'
						placeholder='e.g. 123456'
						value={stepTwoForm.values.code}
						disabled={loading}
						onChange={stepTwoForm.handleChange}
						onFocus={stepTwoForm.handleFocus}
						autoComplete={false}
						error={stepTwoForm.errors.code}
					/>

					{error && <p className={classes.Error}>{error}</p>}

					<Button className={classes.Button} onClick={stepTwoForm.handleSubmit} loading={loading}>
						Verify
					</Button>
				</Form>
			) : (
				<Form className={classes.Form}>
					<Input
						inputClassName={classes.Input}
						name='password'
						placeholder='password'
						value={stepThreeForm.values.password}
						disabled={loading}
						onChange={stepThreeForm.handleChange}
						onFocus={stepThreeForm.handleFocus}
						autoComplete={false}
						error={stepThreeForm.errors.password}
						secure
					/>

					<Input
						inputClassName={classes.Input}
						name='repeatPassword'
						placeholder='repeat password'
						value={stepThreeForm.values.repeatPassword}
						disabled={loading}
						onChange={stepThreeForm.handleChange}
						onFocus={stepThreeForm.handleFocus}
						autoComplete={false}
						error={stepThreeForm.errors.repeatPassword}
						secure
					/>

					{error && <p className={classes.Error}>{error}</p>}

					<Button className={classes.Button} onClick={stepThreeForm.handleSubmit} loading={loading}>
						Save
					</Button>
				</Form>
			)}
		</Authentication>
	);
};

export default Recover;

export const Head: HeadFC = () => <Seo>Recover</Seo>;
