import React, { useState } from 'react';

import { PROFILE_PICTURE } from 'config/data';
import { navigate } from 'gatsby';
import { delay } from 'utils/date';

import Form from 'containers/Form/Form';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';
import useForm from 'hooks/useForm';

import Upload from 'assets/icons/upload.svg';
import Trash from 'assets/icons/trash.svg';

import * as classes from './Account.module.scss';

type MetaFields = {
	name: string;
	email: string;
};

type CredentialsFields = {
	password: string;
	newPassword: string;
};

const Account = () => {
	const [loadingMeta, setLoadingMeta] = useState<boolean>(false);
	const [loadingCredentials, setLoadingCredentials] = useState<boolean>(false);

	const [errorMeta, setErrorMeta] = useState<string>();
	const [errorCredentials, setErrorCredentials] = useState<string>();

	const mForm = useForm<MetaFields>({
		initialValues: {
			name: '',
			email: ''
		},
		rules: {
			name: {
				required: true
			},
			email: {
				required: true
			}
		},
		onSubmit: submitMetaHandler,
		onRefill: () => setErrorMeta(undefined)
	});

	const cForm = useForm<CredentialsFields>({
		initialValues: {
			password: '',
			newPassword: ''
		},
		rules: {
			password: {
				required: true,
				isPassword: true
			},
			newPassword: {
				required: true,
				isPassword: true
			}
		},
		onSubmit: submitCredentialsHandler,
		onRefill: () => setErrorCredentials(undefined)
	});

	async function submitMetaHandler() {
		setLoadingMeta(true);

		await delay(2);
	}

	async function submitCredentialsHandler() {
		setLoadingCredentials(true);

		await delay(2);
	}

	function logoutHandler() {
		navigate('/');
	}

	return (
		<div className={classes.Account}>
			<div>
				<div className={classes.Visual}>
					<img src={PROFILE_PICTURE} alt='username' className={classes.Picture} />

					<div className={classes.Actions}>
						<Button className={classes.Action} iconClassName={classes.Icon} icon={<Upload />} ghost>
							Upload
						</Button>

						<Button className={classes.Action} iconClassName={classes.Icon} icon={<Trash />} ghost>
							Remove
						</Button>
					</div>
				</div>

				<div className={classes.Data}>
					<Form className={classes.Meta}>
						<Input
							inputClassName={classes.Input}
							name='name'
							placeholder='John Doe'
							value={mForm.values.name}
							disabled={loadingMeta}
							onChange={mForm.handleChange}
							onFocus={mForm.handleFocus}
							autoComplete={false}
							error={mForm.errors.name}
						/>

						<Input
							inputClassName={classes.Input}
							placeholder='johndoe@example.com'
							value='justvladon@outlook.com'
							disabled={true}
						/>

						{errorMeta && <p className={classes.Error}>{errorMeta}</p>}

						<Button className={classes.Button} onClick={mForm.handleSubmit} loading={loadingMeta}>
							Update
						</Button>
					</Form>

					<Form className={classes.Credentials}>
						<Input
							inputClassName={classes.Input}
							name='password'
							placeholder='current password'
							value={cForm.values.password}
							disabled={loadingCredentials}
							onChange={cForm.handleChange}
							onFocus={cForm.handleFocus}
							autoComplete={false}
							error={cForm.errors.password}
							secure
						/>

						<Input
							inputClassName={classes.Input}
							name='newPassword'
							placeholder='new password'
							value={cForm.values.newPassword}
							disabled={loadingCredentials}
							onChange={cForm.handleChange}
							onFocus={cForm.handleFocus}
							autoComplete={false}
							error={cForm.errors.newPassword}
							secure
						/>

						{errorCredentials && <p className={classes.Error}>{errorCredentials}</p>}

						<Button className={classes.Button} onClick={cForm.handleSubmit} loading={loadingCredentials}>
							Save
						</Button>
					</Form>
				</div>
			</div>

			<Button className={classes.Logout} onClick={logoutHandler} ghost>
				log out
			</Button>
		</div>
	);
};

export default Account;
