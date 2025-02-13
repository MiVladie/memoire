import { useEffect, useRef } from 'react';

interface Props {
	offset?: number;
	onCross?: () => void;
}

const useScroll = ({ offset = 0, onCross }: Props) => {
	const crossed = useRef<boolean>(false);

	const element = useRef<any>(null);

	useEffect(() => {
		if (!element.current) {
			return;
		}

		function handleScroll() {
			if (crossed.current) {
				return;
			}

			const { scrollTop, scrollHeight, clientHeight } = element.current;

			const passedThreshold = scrollTop + clientHeight >= scrollHeight - offset;

			if (passedThreshold) {
				crossed.current = true;

				onCross?.();
			}
		}

		const currentElement = element.current;
		currentElement.addEventListener('scroll', handleScroll);

		return () => {
			currentElement?.removeEventListener('scroll', handleScroll);
		};
	}, [element.current, offset]);

	function resetHandler() {
		crossed.current = false;
	}

	return { element, resetHandler };
};

export default useScroll;
