import React from 'react';

import { hexToRGBA } from 'util/style';

import classes from './Content.module.scss';

interface Props {
	title: string;
	icon: React.ReactNode;
	color: string;
	meta?: React.ReactNode;
	children: React.ReactNode;
	className?: string;
}

const Content = ({ title, icon, color, meta, children, className }: Props) => (
	<div className={[classes.Content, className].join(' ')}>
		<div
			className={classes.Header}
			style={{
				backgroundImage: `linear-gradient(
                rgba(${hexToRGBA(color, 0.4).join(', ')}),
                rgba(${hexToRGBA(color, 0.15).join(', ')}),
                #121212
            )`
			}}>
			<h1 className={classes.Title}>{title}</h1>

			{meta && <div className={classes.Meta}>{meta}</div>}

			<i className={classes.Icon}>{icon}</i>
		</div>

		<div className={classes.Main}>{children}</div>
	</div>
);

export default Content;
