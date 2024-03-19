import * as React from 'react';

import { PROJECT_NAME } from 'config/constants';

interface Props {
	title?: string;
	children?: React.ReactNode;
}

const Seo = ({ title, children }: Props) => (
	<>
		<html lang='en' />

		<title>{title ? `${title} | ${PROJECT_NAME}` : PROJECT_NAME}</title>
		<meta
			name='description'
			content='Mémoire is a project designed to keep track of listed & unlisted songs on music platforms of your choice'
		/>

		{children}
	</>
);

export default Seo;
