import React, { useState } from 'react';

import { AuthStorage } from 'interfaces/storage';
import { AUTH_STORAGE_KEYS } from 'config/storage';

import Form from 'containers/Form/Form';
import Input from 'components/Input/Input';
import Checkbox from 'components/Checkbox/Checkbox';
import Button from 'components/Button/Button';
import Storage from 'shared/Storage';
import useForm from 'hooks/useForm';

import Code from 'assets/icons/code.svg';

import * as API from 'apis';

import * as classes from './SoundCloud.module.scss';

type ConfigFields = {
	soundcloudName: string;
};

const SoundCloud = () => {
	const [linked, setLinked] = useState<boolean>(initialLinked);
	const [agree, setAgree] = useState<boolean>(false);

	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>();

	const { values, errors, handleChange, handleFocus, handleErrors, handleSubmit } = useForm<ConfigFields>({
		initialValues: {
			soundcloudName: ''
		},
		rules: {
			soundcloudName: {
				required: true
			}
		},
		onSubmit: submitHandler,
		onRefill: () => setError(undefined)
	});

	function initialLinked() {
		const { user } = Storage.get<AuthStorage>(AUTH_STORAGE_KEYS);

		return !!user?.soundcloudId;
	}

	async function submitHandler({ soundcloudName }: ConfigFields) {
		setLoading(true);

		try {
			const { user } = await API.User.linkSoundCloud({ soundcloudName });

			Storage.set<AuthStorage>({ user });

			setLinked(true);
		} catch (error: any) {
			if (error.meta) {
				handleErrors(error.meta);
			} else {
				setError(error.message);
			}
		} finally {
			handleChange('', 'soundcloudName');

			setLoading(false);
		}
	}

	async function unlinkHandler() {
		setLoading(true);

		try {
			const { user } = await API.User.unlinkSoundCloud();

			Storage.set<AuthStorage>({ user });

			setLinked(false);
		} catch (error: any) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className={classes.SoundCloud}>
			{!linked ? (
				<Form className={classes.Form}>
					<Input
						icon={<Code />}
						inputClassName={classes.Input}
						name='soundcloudName'
						placeholder='yourcreativename'
						value={values.soundcloudName}
						disabled={loading}
						onChange={handleChange}
						onFocus={handleFocus}
						autoComplete={false}
						error={errors.soundcloudName}
					/>

					{error && <p className={classes.Error}>{error}</p>}

					<Button className={classes.Button} onClick={handleSubmit} loading={loading}>
						Save
					</Button>
				</Form>
			) : (
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
			)}

			<div className={classes.Instructions}></div>
		</div>
	);
};

export default SoundCloud;
