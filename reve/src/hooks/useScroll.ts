import { useEffect, useRef } from 'react';

interface Props {
	active?: boolean;
	crossOffset?: number;
	onCross?: () => void;
	onScroll?: () => void;
}

const useScroll = ({ crossOffset = 0, active = true, onCross, onScroll }: Props) => {
	const crossed = useRef<boolean>(false);

	const element = useRef<any>(null);

	useEffect(() => {
		if (!element.current || !active) {
			return;
		}

		function crossHandler() {
			if (!onCross) return;

			const { scrollTop, scrollHeight, clientHeight } = element.current;

			const passedThreshold = scrollTop + clientHeight >= scrollHeight - crossOffset;

			if (passedThreshold) {
				crossed.current = true;

				onCross();
			}
		}

		function handleScroll() {
			if (crossed.current) {
				return;
			}

			crossHandler();

			onScroll?.();
		}

		element.current.addEventListener('scroll', handleScroll);

		return () => {
			element.current?.removeEventListener('scroll', handleScroll);
		};
	}, [element, crossOffset, active, onCross, onScroll]);

	function resetCrossHandler() {
		crossed.current = false;
	}

	return { element, resetCrossHandler };
};

export default useScroll;
