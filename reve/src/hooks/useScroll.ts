import { useEffect, useRef, useState } from 'react';

interface Props {
	offset?: number;
}

const useScroll = ({ offset = 0 }: Props) => {
	const [crossed, setCrossed] = useState<boolean>(false);

	const element = useRef<HTMLElement>(null);

	useEffect(() => {
		if (!element.current) {
			return;
		}

		function handleScroll() {
			if (!element.current || crossed) {
				return;
			}

			const { scrollTop, scrollHeight, clientHeight } = element.current;

			const passedThreshold = scrollTop + clientHeight >= scrollHeight - offset;

			setCrossed(passedThreshold);
		}

		element.current.addEventListener('scroll', handleScroll);

		return () => {
			if (element.current) {
				element.current.removeEventListener('scroll', handleScroll);
			}
		};
	}, [element.current, offset]);

	function resetHandler() {
		setCrossed(false);
	}

	return { element, crossed, resetHandler };
};

export default useScroll;
