import React, { useEffect, useRef, useState } from 'react';

import classes from './Slider.module.scss';

interface Props {
	value: number;
	onChange?: (value: number) => void;
	className?: string;
}

const Slider = ({ value, onChange, className }: Props) => {
	const [dragging, setDragging] = useState<boolean>(false);

	const isDragging = useRef<boolean>(false);

	const sliderRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => handleDragMove(event);
		const handleTouchMove = (event: TouchEvent) => handleDragMove(event);

		const handleMouseUp = handleDragEnd;

		if (isDragging.current) {
			window.addEventListener('mousemove', handleMouseMove);
			window.addEventListener('mouseup', handleMouseUp);

			window.addEventListener('touchmove', handleTouchMove);
			window.addEventListener('touchend', handleMouseUp);
		}

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);

			window.removeEventListener('touchmove', handleTouchMove);
			window.removeEventListener('touchend', handleMouseUp);
		};
	}, [isDragging.current]);

	function updateValue(clientX: number) {
		if (!sliderRef.current) return;

		const rect = sliderRef.current.getBoundingClientRect();

		let newValue = (clientX - rect.left) / rect.width;
		newValue = Math.min(1, Math.max(0, newValue));

		onChange?.(newValue);
	}

	function handleDragStart(event: React.MouseEvent | React.TouchEvent) {
		setDragging(true);

		isDragging.current = true;

		document.body.style.userSelect = 'none';
		document.body.style.cursor = 'pointer';

		const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
		updateValue(clientX);
	}

	function handleDragMove(event: MouseEvent | TouchEvent) {
		if (!isDragging.current) return;

		const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
		updateValue(clientX);
	}

	function handleDragEnd() {
		isDragging.current = false;

		document.body.style.userSelect = 'auto';
		document.body.style.cursor = 'auto';

		setDragging(false);
	}

	return (
		<div
			className={[classes.Slider, className].join(' ')}
			ref={sliderRef}
			onTouchStart={handleDragStart}
			onMouseDown={handleDragStart}>
			<div className={classes.Bar} />

			<div className={classes.Progress} style={{ width: `${value * 100}%` }} />

			<div
				className={[classes.Handle, dragging ? classes.HandleActive : ''].join(' ')}
				style={{ left: `calc(${value * 100}% - 5px)` }}
			/>
		</div>
	);
};

export default Slider;
