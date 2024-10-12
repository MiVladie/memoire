import React, { useMemo, useState } from 'react';

import { HeadFC, navigate } from 'gatsby';
import { PLATFORM_STORAGE_KEYS } from 'config/storage';
import { PlatformStorage } from 'interfaces/storage';
import { ISetting } from 'interfaces/data';

import Account from 'containers/Account/Account';
import SoundCloud from 'containers/SoundCloud/SoundCloud';
import Storage from 'shared/Storage';
import Settings from 'containers/Settings/Settings';
import Seo from 'hoc/Seo/Seo';

import X from 'assets/icons/close.svg';

import * as classes from './Profile.module.scss';

const Profile = () => {
	const [section, setSection] = useState<number>(0);

	const settings = useMemo<ISetting[]>(initialSettings, []);

	function initialSettings() {
		const { platforms } = Storage.get<PlatformStorage>(PLATFORM_STORAGE_KEYS);

		return [{ id: 0, name: 'Account' }, ...(platforms || [])];
	}

	function sectionHandler(id: number) {
		setSection(id);
	}

	function backHandler() {
		navigate('/home');
	}

	return (
		<div>
			<Settings
				data={settings}
				onUpdate={sectionHandler}
				actions={<X className={classes.X} onClick={backHandler} />}>
				{section === 0 ? <Account /> : section === 1 ? <SoundCloud /> : null}
			</Settings>
		</div>
	);
};

export default Profile;

export const Head: HeadFC = () => <Seo>Profile</Seo>;
