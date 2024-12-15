import React, { useState } from 'react';

import { useAuth } from 'context/useAuth';

import { ReactComponent as Person } from 'assets/icons/person.svg';
import { ReactComponent as Email } from 'assets/icons/email.svg';

import Content from 'containers/Content/Content';
import Form from 'containers/Form/Form';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import useForm from 'hooks/useForm';

import * as API from 'api';

import classes from './Profile.module.scss';

type ProfileFields = {
	name: string;
	email: string;
};

interface Props {
	className?: string;
}

const Profile = ({ className }: Props) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>();

	const { state, update } = useAuth();

	const { values, errors, handleChange, handleFocus, handleSubmit, handleErrors } = useForm<ProfileFields>({
		initialValues: {
			name: state.user?.name ?? '',
			email: state.user?.email ?? ''
		},
		rules: {
			name: {
				required: true
			},
			email: {
				required: true
			}
		},
		onSubmit: submitHandler,
		onRefill: () => setError(undefined)
	});

	async function submitHandler({ name }: ProfileFields) {
		setLoading(true);

		try {
			const { user } = await API.User.update({ name });

			update(user);
		} catch (error: any) {
			if (error.meta) {
				handleErrors(error.meta);
			} else {
				setError(error.message);
			}
		} finally {
			setLoading(false);
		}
	}

	return (
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
				dark
			/>

			<Input
				icon={<Email />}
				name='email'
				placeholder='johndoe@example.com'
				value={values.email}
				disabled={true}
				dark
			/>

			{error && <p className={classes.Error}>{error}</p>}

			<Button className={classes.Button} onClick={handleSubmit} loading={loading}>
				Save
			</Button>
		</Form>
	);
};

export default Profile;
