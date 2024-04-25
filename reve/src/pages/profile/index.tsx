import React, { useState } from 'react';

import { HeadFC, navigate } from 'gatsby';
import { SETTINGS_DATA } from 'config/data';

import Account from 'containers/Account/Account';
import SoundCloud from 'containers/SoundCloud/SoundCloud';
import Settings from 'containers/Settings/Settings';
import Seo from 'hoc/Seo/Seo';

import X from 'assets/icons/close.svg';

import * as classes from './Profile.module.scss';

const Profile = () => {
	const [setting, setSetting] = useState<number>(1);

	function settingHandler(id: number) {
		setSetting(id);
	}

	function backHandler() {
		navigate('/home');
	}

	return (
		<div>
			<Settings
				data={SETTINGS_DATA}
				onUpdate={settingHandler}
				actions={<X className={classes.X} onClick={backHandler} />}>
				{setting === 1 ? <Account /> : <SoundCloud />}
			</Settings>
		</div>
	);
};

export default Profile;

export const Head: HeadFC = () => <Seo>Profile</Seo>;
