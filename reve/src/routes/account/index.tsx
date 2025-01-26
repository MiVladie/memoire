import React, { useMemo, useState } from 'react';

import { ACCOUNT } from 'assets/data/sample';
import { useNavigation } from 'context/useNavigation';
import { useQueue } from 'context/useQueue';
import { useAuth } from 'context/useAuth';

import { ReactComponent as Person } from 'assets/icons/person.svg';
import { ReactComponent as Lock } from 'assets/icons/lock.svg';
import { ReactComponent as SoundCloudIcon } from 'assets/icons/soundcloud.svg';
import { ReactComponent as Logout } from 'assets/icons/logout.svg';

import Menu from 'containers/Menu/Menu';
import Profile from 'containers/Profile/Profile';
import Content from 'containers/Content/Content';
import SoundCloud from 'containers/SoundCloud/SoundCloud';
import Password from 'containers/Password/Password';
import Seo from 'hoc/Seo/Seo';

import classes from './Account.module.scss';

const Account = () => {
	const [selected, setSelected] = useState<number>(ACCOUNT[0].id);

	const {
		state: { menuVisible },
		toggleMenu
	} = useNavigation();

	const {
		state: { active }
	} = useQueue();
	const { state, clear } = useAuth();

	function selectHandler(id: number) {
		setSelected(id);

		toggleMenu();
	}

	function logoutHandler() {
		toggleMenu();

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
				active ? classes.AccountQueue : ''
			].join(' ')}>
			<div className={classes.Menu}>
				<Menu
					data={ACCOUNT}
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
				) : (
					<SoundCloud className={classes.Content} />
				)}
			</Content>
		</div>
	);
};

export default Account;

export const Head = () => <Seo>Account</Seo>;
