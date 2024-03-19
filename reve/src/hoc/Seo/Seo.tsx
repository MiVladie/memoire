import * as React from 'react';

import { PROJECT_NAME } from 'config/constants';

interface Props {
	title?: string;
	children?: string | React.ReactNode;
}

const Seo = ({ title, children }: Props) => (
	<>
		<html lang='en' />

		{typeof children === 'string' ? (
			<title>
				{children} | {PROJECT_NAME}
			</title>
		) : (
			<>
				<title>{title ? `${title} | ${PROJECT_NAME}` : PROJECT_NAME}</title>
				{children}
			</>
		)}

		<meta
			name='description'
			content='Mémoire is a project designed to keep track of listed & unlisted songs on music platforms of your choice'
		/>
	</>
);

export default Seo;
