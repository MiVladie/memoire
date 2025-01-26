import React, { CSSProperties } from 'react';

import { hexToRGBA } from 'util/style';

import classes from './Content.module.scss';

interface Props {
	title: string;
	icon: React.ReactNode;
	color: string;
	meta?: React.ReactNode;
	children: React.ReactNode;
	className?: string;
	style?: CSSProperties;
	scrollRef?: React.RefObject<HTMLDivElement>;
}

const Content = ({ title, icon, color, meta, children, className, style, scrollRef }: Props) => (
	<div className={[classes.Content, className].join(' ')} style={style} ref={scrollRef}>
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
