import * as React from 'react';

import { Helmet } from 'react-helmet';
import { PROJECT_DESCRIPTION, PROJECT_NAME } from 'config/project';

interface Props {
	title?: string;
	children?: string | React.ReactNode;
}

const Seo = ({ title, children }: Props) => (
	<Helmet>
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
	</Helmet>
);

export default Seo;
