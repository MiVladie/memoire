import React from 'react';

import { useNavigation } from 'context/useNavigation';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from 'context/useAuth';

import { ReactComponent as Menu } from 'assets/icons/menu.svg';
import { ReactComponent as X } from 'assets/icons/x.svg';
import { ReactComponent as Search } from 'assets/icons/search.svg';

import Input from 'components/Input/Input';
import useScreen from 'hooks/useScreen';
import useForm from 'hooks/useForm';

import classes from './Navbar.module.scss';

interface Props {
	className?: string;
}

type SearchFields = {
	query: string;
};

const Navbar = ({ className }: Props) => {
	const { isMobile } = useScreen();

	const {
		state: { user }
	} = useAuth();
	const {
		state: { menuVisible },
		toggle
	} = useNavigation();

	const { pathname } = useLocation();

	const navigate = useNavigate();

	const { values, handleChange } = useForm<SearchFields>({
		initialValues: {
			query: ''
		}
	});

	function accountHandler() {
		navigate(!pathname.includes('account') ? '/account' : '/');
	}

	return (
		<nav className={[classes.Navbar, className].join(' ')}>
			<div className={classes.Toggle} onClick={toggle}>
				{!menuVisible ? <Menu /> : <X />}
			</div>

			<Input
				icon={<Search className={classes.Icon} />}
				name='query'
				placeholder={!isMobile ? 'What would you like to listen to?' : 'Search'}
				value={values.query}
				onChange={handleChange}
				autoComplete={false}
				className={classes.Input}
			/>

			<div className={classes.Avatar} onClick={accountHandler}>
				{user!.image ? (
					<img src={user!.image} alt='profile avatar' className={classes.Image} />
				) : (
					<div className={classes.Placeholder}>
						<p className={classes.Initial}>{user!.name.charAt(0)}</p>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
