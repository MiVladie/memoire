import React from 'react';

import Skeleton from 'components/Skeleton/Skeleton';

import classes from './Menu.module.scss';

interface Item {
	id: number;
	icon: React.ReactNode;
	name: string;
	color?: string;
	onClick?: (id: number) => void;
}

interface Props {
	data: Item[];
	bottom?: Item[];
	highlighted?: number;
	active?: number;
	onClick?: (id: number) => void;
	meta?: React.ReactNode;
	className?: string;
	loading?: boolean;
}

const Menu = ({ data, bottom, highlighted, active, onClick, meta, className, loading }: Props) => {
	function renderItems(items: Item[]) {
		return items.map((item) => {
			const isHighlighted = highlighted === item.id;
			const isActive = active === item.id;

			return (
				<li
					className={classes.Item}
					onClick={() => (item.onClick ? item.onClick(item.id) : !isHighlighted && onClick?.(item.id))}
					key={item.id}>
					<div className={[classes.Info, isHighlighted && classes.InfoActive].join(' ')}>
						<i className={classes.Icon} style={isHighlighted ? { fill: item.color } : undefined}>
							{item.icon}
						</i>

						<p className={classes.Name}>{item.name}</p>
					</div>

					{isActive && meta}
				</li>
			);
		});
	}

	if (loading) {
		return <Skeleton className={[classes.Menu, className].join(' ')} />;
	}

	return (
		<div className={[classes.Menu, className].join(' ')}>
			<ul className={classes.Items}>{renderItems(data)}</ul>

			{bottom && <ul className={classes.Items}>{renderItems(bottom)}</ul>}
		</div>
	);
};

export default Menu;
