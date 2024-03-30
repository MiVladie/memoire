import React from 'react';

import Avatar from 'assets/icons/account.svg';

import * as classes from './Account.module.scss';

interface Props {
	onClick?: () => void;
}

const Account = ({ onClick }: Props) => {
	return <Avatar className={classes.Account} onClick={onClick} />;
};

export default Account;
