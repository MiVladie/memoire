import { useEffect, useState } from 'react';

const useScreen = () => {
	const [width, setWidth] = useState<number>(window.innerWidth);

	useEffect(() => {
		function handleResize() {
			setWidth(window.innerWidth);
		}

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return {
		isMobile: width < 720,
		isTablet: width >= 720 && width < 1025,
		isDesktop: width >= 1025,
		width
	};
};

export default useScreen;
