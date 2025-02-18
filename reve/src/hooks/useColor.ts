import { useEffect, useRef, useState } from 'react';

import { rgbToHEX } from 'util/style';

// @ts-ignore
import ColorThief from 'colorthief';

interface Props {
	src?: string | null;
}

const useColor = ({ src }: Props) => {
	const [color, setColor] = useState<string>();

	const element = useRef<HTMLImageElement>();

	useEffect(() => {
		if (!src) {
			return;
		}

		element.current = document.createElement('img');

		element.current.src = src;
		element.current.crossOrigin = 'Anonymous';
		element.current.alt = 'image';

		element.current.onload = () => {
			const colorThief = new ColorThief();

			try {
				const color = colorThief.getColor(element.current) as [number, number, number];

				setColor(rgbToHEX(...color));
			} catch (error) {
				console.log(error);
			}
		};

		return () => {
			element.current!.remove();
		};
	}, [src]);

	return { color };
};

export default useColor;
