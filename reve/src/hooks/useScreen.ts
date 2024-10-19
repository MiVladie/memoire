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
		isTablet: width >= 720 && width < 1024,
		isDesktop: width >= 1024
	};
};

export default useScreen;
