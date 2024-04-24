import React from 'react';

import { HeadFC, navigate } from 'gatsby';
import { SETTINGS_DATA } from 'config/data';

import Layout from 'hoc/Layout/Layout';
import Account from 'containers/Account/Account';
import Settings from 'containers/Settings/Settings';
import Seo from 'hoc/Seo/Seo';

import X from 'assets/icons/close.svg';

import * as classes from './Profile.module.scss';

const Profile = () => {
	function settingHandler(id: number) {
		console.log({ id });
	}

	function backHandler() {
		navigate('/home');
	}

	return (
		<Layout>
			<Settings
				data={SETTINGS_DATA}
				onUpdate={settingHandler}
				actions={<X className={classes.X} onClick={backHandler} />}>
				<Account />
			</Settings>
		</Layout>
	);
};

export default Profile;

export const Head: HeadFC = () => <Seo>Profile</Seo>;
