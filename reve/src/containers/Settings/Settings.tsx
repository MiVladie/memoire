import React, { useState } from 'react';

import { ISetting } from 'interfaces/data';

import Container from 'hoc/Container/Container';
import SnapScroll from 'containers/SnapScroll/SnapScroll';

import * as classes from './Settings.module.scss';

interface Props {
	data: ISetting[];
	onUpdate?: (id: number) => void;
	className?: string;
	containerClassName?: string;
	actions?: React.ReactNode;
	children: React.ReactNode;
}

const Settings = ({ data, onUpdate, className, containerClassName, actions, children }: Props) => {
	const [setting, setSetting] = useState<number>(0);

	function settingHandler(index: number) {
		if (setting === index) return;

		setSetting(index);

		onUpdate?.(data[index].id);
	}

	return (
		<div className={[classes.Container, className].join(' ')}>
			<SnapScroll active={setting} onSelect={settingHandler} className={classes.Settings}>
				{data.map((s, index) => {
					const isActive = setting === index;

					return (
						<li className={[classes.Setting, isActive && classes.SettingSelected].join(' ')} key={s.id}>
							<p className={classes.Title}>{s.name}</p>
						</li>
					);
				})}
			</SnapScroll>

			{actions && <div className={classes.Actions}>{actions}</div>}

			<div className={classes.HorizontalShade} />

			{actions && <div className={classes.ActionsShade} />}

			<Container className={[classes.List, containerClassName].join(' ')}>{children}</Container>
		</div>
	);
};

export default Settings;
