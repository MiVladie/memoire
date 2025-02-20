import React, { useMemo, useState } from 'react';

import { SETTINGS_MENU } from 'config/project';
import { useNavigation } from 'context/useNavigation';
import { useQueue } from 'context/useQueue';
import { useAuth } from 'context/useAuth';

import { ReactComponent as Person } from 'assets/icons/person.svg';
import { ReactComponent as Lock } from 'assets/icons/lock.svg';
import { ReactComponent as SoundCloudIcon } from 'assets/icons/soundcloud.svg';
import { ReactComponent as YouTubeIcon } from 'assets/icons/youtube.svg';
import { ReactComponent as Logout } from 'assets/icons/logout.svg';

import Menu from 'containers/Menu/Menu';
import Profile from 'containers/Profile/Profile';
import Content from 'containers/Content/Content';
import SoundCloud from 'containers/SoundCloud/SoundCloud';
import Password from 'containers/Password/Password';
import Seo from 'hoc/Seo/Seo';

import classes from './Account.module.scss';

const Account = () => {
	const [selected, setSelected] = useState<number>(1);

	const {
		state: { menuVisible, queueActive },
		toggleMenu,
		activateQueue
	} = useNavigation();

	const { stop } = useQueue();

	const { state, clear } = useAuth();

	function selectHandler(id: number) {
		setSelected(id);

		toggleMenu();
	}

	function logoutHandler() {
		toggleMenu(false);
		activateQueue(false);

		stop();

		clear();
	}

	const content = useMemo(() => {
		switch (selected) {
			case 1:
				return {
					title: state.user?.name ?? '',
					icon: <Person />,
					color: '#8174A0'
				};

			case 2:
				return {
					title: 'Password',
					icon: <Lock />,
					color: '#659287'
				};

			case 3:
				return {
					title: 'SoundCloud',
					icon: <SoundCloudIcon />,
					color: '#FF7500'
				};

			case 4:
				return {
					title: 'YouTube',
					icon: <YouTubeIcon />,
					color: '#FF0000'
				};

			default:
				return {
					title: '',
					icon: null,
					color: ''
				};
		}
	}, [selected]);

	return (
		<div
			className={[
				classes.Account,
				menuVisible ? classes.AccountMenu : '',
				queueActive ? classes.AccountQueue : ''
			].join(' ')}>
			<div className={classes.Menu}>
				<Menu
					data={SETTINGS_MENU}
					bottom={[
						{
							id: 5,
							icon: <Logout />,
							name: 'Log Out',
							onClick: logoutHandler
						}
					]}
					highlighted={selected}
					onClick={selectHandler}
				/>
			</div>

			<Content title={content.title} icon={content.icon} color={content.color} className={classes.Content}>
				{selected === 1 ? (
					<Profile className={classes.Content} />
				) : selected === 2 ? (
					<Password className={classes.Content} />
				) : selected === 3 ? (
					<SoundCloud className={classes.Content} />
				) : null}
			</Content>
		</div>
	);
};

export default Account;

export const Head = () => <Seo>Account</Seo>;
