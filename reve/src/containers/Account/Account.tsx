import React, { useState } from 'react';

import { PROFILE_PICTURE } from 'config/data';
import { AuthStorage } from 'interfaces/storage';
import { AUTH_STORAGE_KEYS } from 'config/storage';
import { User } from 'interfaces/models';
import { navigate } from 'gatsby';

import Form from 'containers/Form/Form';
import Input from 'components/Input/Input';
import Button from 'components/Button/Button';

import useForm from 'hooks/useForm';
import useFile from 'hooks/useFile';

import Upload from 'assets/icons/upload.svg';
import Trash from 'assets/icons/trash.svg';

import Storage from 'shared/Storage';

import * as API from 'api';
import * as File from 'constants/file';

import * as classes from './Account.module.scss';
import { delay } from 'utils/date';

type MetaFields = {
	name: string;
	email: string;
};

type CredentialsFields = {
	password: string;
	newPassword: string;
};

function initialUser(): User {
	const { user } = Storage.get<AuthStorage>(['user']);

	return user!;
}

const Account = () => {
	const [user, setUser] = useState<User>(initialUser);

	const [uploading, setUploading] = useState<boolean>(false);
	const [removing, setRemoving] = useState<boolean>(false);

	const [loadingMeta, setLoadingMeta] = useState<boolean>(false);
	const [loadingCredentials, setLoadingCredentials] = useState<boolean>(false);

	const [errorMeta, setErrorMeta] = useState<string>();
	const [errorCredentials, setErrorCredentials] = useState<string>();

	const { handleUpload } = useFile({
		types: File.IMAGE_TYPES,
		onUpload: uploadImageHandler
	});

	const mForm = useForm<MetaFields>({
		initialValues: {
			name: user.name,
			email: user.email
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

	async function uploadImageHandler(image: File) {
		setUploading(true);

		try {
			const { user } = await API.User.uploadImage({ image });

			Storage.set<AuthStorage>({ user });

			setUser(user);
		} catch (error) {
			console.error(error);
		} finally {
			setUploading(false);
		}
	}

	async function removeImageHandler() {
		setRemoving(true);

		try {
			const { user } = await API.User.removeImage();

			Storage.set<AuthStorage>({ user });

			setUser(user);
		} catch (error) {
			console.error(error);
		} finally {
			setRemoving(false);
		}
	}

	async function submitMetaHandler({ name }: MetaFields) {
		setLoadingMeta(true);

		try {
			const { user } = await API.User.update({ name });

			Storage.set<AuthStorage>({ user });

			setUser(user);
		} catch (error: any) {
			if (error.meta) {
				mForm.handleErrors(error.meta);
			} else {
				setErrorMeta(error.message);
			}
		} finally {
			setLoadingMeta(false);
		}
	}

	async function submitCredentialsHandler({ password, newPassword }: CredentialsFields) {
		setLoadingCredentials(true);

		try {
			await API.User.updatePassword({ password, newPassword });
		} catch (error: any) {
			if (error.meta) {
				cForm.handleErrors(error.meta);
			} else {
				setErrorCredentials(error.message);
			}
		} finally {
			cForm.handleChange('', 'password');
			cForm.handleChange('', 'newPassword');

			setLoadingCredentials(false);
		}
	}

	function logoutHandler() {
		Storage.remove<AuthStorage>(AUTH_STORAGE_KEYS);

		navigate('/signin');
	}

	return (
		<div className={classes.Account}>
			<div>
				<div className={classes.Visual}>
					<img src={user.image || PROFILE_PICTURE} alt='username' className={classes.Picture} />

					<div className={classes.Actions}>
						<Button
							className={classes.Upload}
							iconClassName={classes.Icon}
							onClick={handleUpload}
							icon={<Upload />}
							loading={uploading}
							disabled={removing}
							ghost>
							Upload
						</Button>

						{user.image && (
							<Button
								className={classes.Remove}
								iconClassName={classes.Icon}
								onClick={removeImageHandler}
								icon={<Trash />}
								loading={removing}
								disabled={uploading}
								ghost>
								Remove
							</Button>
						)}
					</div>
				</div>

				<div className={classes.Data}>
					<Form className={classes.Meta}>
						<Input
							name='name'
							placeholder='John Doe'
							value={mForm.values.name}
							disabled={loadingMeta}
							onChange={mForm.handleChange}
							onFocus={mForm.handleFocus}
							autoComplete={false}
							error={mForm.errors.name}
						/>

						<Input placeholder='johndoe@example.com' value='justvladon@outlook.com' disabled={true} />

						{errorMeta && <p className={classes.Error}>{errorMeta}</p>}

						<Button className={classes.Button} onClick={mForm.handleSubmit} loading={loadingMeta}>
							Update
						</Button>
					</Form>

					<Form className={classes.Credentials}>
						<Input
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
