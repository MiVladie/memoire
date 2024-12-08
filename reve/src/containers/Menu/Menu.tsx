import React from 'react';

import classes from './Menu.module.scss';

interface Item {
	id: number;
	icon: React.ReactNode;
	name: string;
	color?: string;
}

interface Props {
	data: Item[];
	highlighted?: number;
	active?: number;
	onClick?: (id: number) => void;
	meta?: React.ReactNode;
	className?: string;
}

const Menu = ({ data, highlighted, active, onClick, meta, className }: Props) => (
	<div className={[classes.Menu, className].join(' ')}>
		<ul className={classes.Items}>
			{data.map((item) => {
				const isHighlighted = highlighted === item.id;
				const isActive = active === item.id;

				return (
					<li className={classes.Item} onClick={() => !isHighlighted && onClick?.(item.id)} key={item.id}>
						<div className={[classes.Info, isHighlighted && classes.InfoActive].join(' ')}>
							<i className={classes.Icon} style={isHighlighted ? { fill: item.color } : undefined}>
								{item.icon}
							</i>

							<p className={classes.Name}>{item.name}</p>
						</div>

						{isActive && meta}
					</li>
				);
			})}
		</ul>
	</div>
);

export default Menu;
