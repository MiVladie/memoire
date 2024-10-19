import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';

import classes from './SnapScroll.module.scss';

const STIFFNESS = 0;

interface Props {
	active: number;
	vertical?: boolean;
	rtl?: boolean;
	onSelect?: (id: number) => void;
	className?: string;
	offset?: number;
	children: React.ReactNode;
}

const SnapScroll = ({ active, vertical, rtl, onSelect, className, offset = 0, children }: Props) => {
	const [startPosition, setStartPosition] = useState<number>(0);
	const [scrollDistance, setScrollDistance] = useState<number>(0);

	const [isDragging, setIsDragging] = useState<boolean>(false);

	const wasDragging = useRef<boolean>(false);
	const focused = useRef<number>(active);

	const lastEndPosition = useRef<number>();

	const container = useRef<HTMLUListElement>(null);

	function startHandler(event: React.MouseEvent | React.TouchEvent) {
		setIsDragging(true);

		// Getting cursor's X|Y position position on screen
		const touchPoint =
			(event as React.MouseEvent)[!vertical ? 'pageX' : 'pageY'] ||
			(event as React.TouchEvent).touches[0][!vertical ? 'pageX' : 'pageY'];

		// Saving starting cursor's position
		setStartPosition(touchPoint);

		// Saving current scrolled distance of container
		setScrollDistance(container.current!.scrollLeft);
	}

	function moveHandler(event: React.MouseEvent | React.TouchEvent) {
		// Preventing dragging functionality [for elements' onClick functionality]
		if (!isDragging) return;
		if (!wasDragging.current) wasDragging.current = true;

		lastEndPosition.current = (event as React.TouchEvent).touches?.[0][!vertical ? 'pageX' : 'pageY'];

		// Getting cursor's X|Y position position on screen
		const touchPoint =
			(event as React.MouseEvent)[!vertical ? 'pageX' : 'pageY'] ||
			(event as React.TouchEvent).touches[0][!vertical ? 'pageX' : 'pageY'];

		// Calculating dragged distance
		const difference = touchPoint - startPosition;

		// Moving container's content [current scrolled distance + dragged distance]
		container.current!.scrollLeft = scrollDistance - difference;
	}

	function endHandler(event: React.MouseEvent | React.TouchEvent) {
		setIsDragging(false);

		// Getting cursor's X|Y position position on screen
		const touchPoint = (event as React.MouseEvent)[!vertical ? 'pageX' : 'pageY'] || lastEndPosition.current!;

		// Getting direction to which contents moved
		const isMovedNext = startPosition > touchPoint;
		const isMovedPrevious = startPosition < touchPoint;

		// Checking if dragged distance passed minimum threshold
		const draggedEnough = Math.abs(startPosition - touchPoint) > STIFFNESS * 10;

		// Element to which content is snapped to
		let snappedElement = container.current!.childNodes[focused.current] as Element;

		if (isMovedNext) {
			// Is there a new element to which contents can be scrolled to
			const isNewElement = focused.current + 1 < container.current!.children.length;

			if (isNewElement && draggedEnough) {
				snappedElement = container.current!.childNodes[focused.current + 1] as Element;

				// Updating focused element
				focused.current = focused.current + 1;
			}
		} else if (isMovedPrevious) {
			// Is there a new element to which contents can be scrolled to
			const isNewElement = focused.current > 0;

			if (isNewElement && draggedEnough) {
				snappedElement = container.current!.childNodes[focused.current - 1] as Element;

				// Updating focused element
				focused.current = focused.current - 1;
			}
		} else {
			// No dragging detected
			return;
		}

		// Getting coordinates
		const containerRect = container.current!.getBoundingClientRect();
		const elementRect = snappedElement.getBoundingClientRect();

		let left = !rtl
			? elementRect[!vertical ? 'left' : 'top'] +
			  scrollDistance +
			  startPosition -
			  touchPoint -
			  containerRect[!vertical ? 'left' : 'top'] -
			  offset!
			: elementRect[!vertical ? 'right' : 'bottom'] +
			  scrollDistance +
			  startPosition -
			  touchPoint -
			  containerRect[!vertical ? 'right' : 'bottom'] +
			  offset!;

		// Scrolling to snapped element within a parent container
		container.current!.scrollTo({ left, behavior: 'smooth' });
	}

	function clickHandler(index: number) {
		// Preventing dragging functionality [for elements' onClick functionality]
		if (wasDragging.current) {
			wasDragging.current = false;

			return;
		}

		// Not doing anything if clicked item is already selected
		if (active === index) return;

		// Selecting new element
		onSelect?.(index);
	}

	useEffect(() => {
		// Updating focused element
		focused.current = active;

		// Scrolling to first element
		if (!rtl) {
			if (active === 0) {
				container.current?.scrollTo({ left: 0, behavior: 'smooth' });

				return;
			}
		} else {
			if (active === React.Children.count(children) - 1) {
				container.current!.scrollTo({
					left: container.current?.scrollWidth
					// behavior: 'smooth'
				});

				return;
			}
		}

		// Element to which content is snapped to
		const snappedElement = container.current?.children[active] as HTMLElement;

		// Getting coordinates
		const containerRect = container.current!.getBoundingClientRect();
		const elementRect = snappedElement.getBoundingClientRect();

		let left = !rtl
			? elementRect[!vertical ? 'left' : 'top'] +
			  scrollDistance -
			  containerRect[!vertical ? 'left' : 'top'] -
			  offset!
			: elementRect[!vertical ? 'right' : 'bottom'] +
			  scrollDistance -
			  containerRect[!vertical ? 'right' : 'bottom'] +
			  offset!;

		// Scrolling to snapped element within a parent container
		container.current?.scrollTo({ left, behavior: 'smooth' });
	}, [active]);

	if (!React.Children.count(children)) {
		return;
	}

	return (
		<ul
			className={[classes.SnapScroll, className].join(' ')}
			onMouseDown={startHandler}
			onMouseUp={endHandler}
			onMouseMove={moveHandler}
			onTouchStart={startHandler}
			onTouchMove={moveHandler}
			onTouchEnd={endHandler}
			ref={container}>
			{React.Children.map(children, (child, index) => {
				if (React.isValidElement(child)) {
					return React.cloneElement(child as React.ReactElement<any>, {
						onClick: () => clickHandler(index)
					});
				}

				return child;
			})}
		</ul>
	);
};

export default SnapScroll;
