import { useEffect, useRef } from 'react';

interface Props {
	offset?: number;
	active?: boolean;
	onCross?: () => void;
}

const useScroll = ({ offset = 0, active = true, onCross }: Props) => {
	const crossed = useRef<boolean>(false);

	const element = useRef<any>(null);

	useEffect(() => {
		if (!element.current || !active) {
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

		element.current.addEventListener('scroll', handleScroll);

		return () => {
			element.current?.removeEventListener('scroll', handleScroll);
		};
	}, [element, offset, active]);

	function resetHandler() {
		crossed.current = false;
	}

	return { element, resetHandler };
};

export default useScroll;
