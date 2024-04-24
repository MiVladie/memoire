import React, { useState } from 'react';

import { delay } from 'utils/date';

import Form from 'containers/Form/Form';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import useForm from 'hooks/useForm';

import Code from 'assets/icons/code.svg';

import * as classes from './SoundCloud.module.scss';
import { PLATFORMS_DATA, PLAYLIST_DATA } from 'config/data';

type ConfigFields = {
	code: string;
};

const SoundCloud = () => {
	const [loading, setLoading] = useState<boolean>(false);

	const [error, setError] = useState<string>();

	const { values, errors, handleChange, handleFocus, handleSubmit } = useForm<ConfigFields>({
		initialValues: {
			code: ''
		},
		rules: {
			code: {
				required: true
			}
		},
		onSubmit: submitHandler,
		onRefill: () => setError(undefined)
	});

	async function submitHandler() {
		setLoading(true);

		await delay(2);
	}

	return (
		<div className={classes.SoundCloud}>
			<Form className={classes.Form}>
				<Input
					icon={<Code />}
					name='code'
					placeholder='your api_key'
					value={values.code}
					disabled={loading}
					onChange={handleChange}
					onFocus={handleFocus}
					autoComplete={false}
					error={errors.code}
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
