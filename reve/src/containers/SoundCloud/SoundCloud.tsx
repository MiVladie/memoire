import React, { useState } from 'react';

import Form from 'containers/Form/Form';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import useForm from 'hooks/useForm';

import Code from 'assets/icons/code.svg';

import * as API from 'api';

import * as classes from './SoundCloud.module.scss';

type ConfigFields = {
	soundcloudName: string;
};

const SoundCloud = () => {
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

	async function submitHandler({ soundcloudName }: ConfigFields) {
		setLoading(true);

		try {
			await API.User.update({ soundcloudName });
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
		<div className={classes.SoundCloud}>
			<Form className={classes.Form}>
				<Input
					icon={<Code />}
					inputClassName={classes.Input}
					className={classes.Username}
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

			<div className={classes.Instructions}></div>
		</div>
	);
};

export default SoundCloud;
