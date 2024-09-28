import { useEffect, useRef } from 'react';

interface Props {
	types?: string[];
	onUpload: (e: File) => void;
}

const useFile = ({ types, onUpload }: Props) => {
	const input = useRef<HTMLInputElement>();

	useEffect(() => {
		input.current = document.createElement('input');

		input.current.type = 'file';
		input.current.style.display = 'none';
		input.current.accept = types?.join(', ') || '*';
		input.current.onchange = (e: any) => onUpload(e.target?.files?.[0] || null);

		return () => {
			input.current!.remove();
		};
	}, []);

	function handleUpload() {
		input.current!.click();
	}

	return { handleUpload };
};

export default useFile;
