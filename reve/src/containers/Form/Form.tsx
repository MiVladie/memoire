import React from 'react';

interface Props {
	className?: string;
	children: React.ReactNode;
}

const Form = ({ className, children }: Props) => {
	return (
		<form className={className} onSubmit={(e) => e.preventDefault()}>
			{children}
		</form>
	);
};

export default Form;
