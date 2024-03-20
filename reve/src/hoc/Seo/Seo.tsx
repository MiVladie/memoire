import * as React from 'react';

import { PROJECT_DESCRIPTION, PROJECT_NAME } from 'config/constants';

interface Props {
	title?: string;
	children?: string | React.ReactNode;
}

const Seo = ({ title, children }: Props) => (
	<>
		<html lang='en' />

		{typeof children === 'string' ? (
			<title>{`${children} | ${PROJECT_NAME}`}</title>
		) : (
			<>
				<title>{title ? `${title} | ${PROJECT_NAME}` : PROJECT_NAME}</title>
				{children}
			</>
		)}

		<meta name='description' content={PROJECT_DESCRIPTION} />
	</>
);

export default Seo;
