import React, { useState } from 'react';

import { useAuth } from 'context/useAuth';

import { ReactComponent as Person } from 'assets/icons/person.svg';

import Form from 'containers/Form/Form';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import Checkbox from 'components/Checkbox/Checkbox';
import useForm from 'hooks/useForm';

import * as API from 'api';

import classes from './SoundCloud.module.scss';

type SoundCloudFields = {
	username: string;
};

interface Props {
	className?: string;
}

const SoundCloud = ({ className }: Props) => {
	const { state, update } = useAuth();

	const [linked, setLinked] = useState<boolean>(!!state.user!.soundcloudId);
	const [agree, setAgree] = useState<boolean>(false);

	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>();

	const { values, errors, handleChange, handleFocus, handleSubmit, handleErrors } = useForm<SoundCloudFields>({
		initialValues: {
			username: ''
		},
		rules: {
			username: {
				required: true
			}
		},
		onSubmit: submitHandler,
		onRefill: () => setError(undefined)
	});

	async function submitHandler({ username }: SoundCloudFields) {
		setLoading(true);

		try {
			const { user } = await API.User.update({ soundcloudName: username });

			update(user);

			setLinked(true);
		} catch (error: any) {
			if (error.meta) {
				handleErrors(error.meta);
			} else {
				setError(error.message);
			}
		} finally {
			handleChange('', 'username');

			setLoading(false);
		}
	}

	async function unlinkHandler() {
		setLoading(true);

		try {
			const { user } = await API.User.unlinkSoundCloud();

			update(user);

			setLinked(false);
		} catch (error: any) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	}

	if (!linked) {
		return (
			<Form className={classes.Form}>
				<Input
					icon={<Person />}
					name='username'
					placeholder='johndoe'
					value={values.username}
					disabled={loading}
					onChange={handleChange}
					onFocus={handleFocus}
					autoComplete={false}
					error={errors.username}
					className={classes.Input}
					dark
				/>

				{error && <p className={classes.Error}>{error}</p>}

				<Button className={classes.Button} onClick={handleSubmit} loading={loading}>
					Link
				</Button>
			</Form>
		);
	}

	return (
		<div className={classes.Info}>
			<p className={classes.Success}>✅ your account is linked!</p>

			<Checkbox
				name='agree'
				value={agree}
				disabled={loading}
				onChange={(value) => setAgree(value)}
				onFocus={handleFocus}
				className={classes.Agree}>
				i wanna unlink it
			</Checkbox>

			<p className={classes.Warning}>warning: this will erase all SoundCloud data!</p>

			<Button className={classes.Button} onClick={unlinkHandler} loading={loading} disabled={!agree}>
				Unlink
			</Button>
		</div>
	);
};

export default SoundCloud;
