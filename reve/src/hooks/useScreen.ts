import { useBreakpoint } from 'gatsby-plugin-breakpoints';

const useScreen = () => {
	const breakpoints = useBreakpoint();

	return {
		isMobile: breakpoints.sm,
		isTablet: breakpoints.md,
		isDesktop: !breakpoints.sm && !breakpoints.md
	};
};

export default useScreen;
