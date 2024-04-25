import '@fontsource/graduate';
import '@fontsource/holtwood-one-sc';
import '@fontsource/urbanist';

import React from 'react';

import Layout from './src/hoc/Layout/Layout';
import Circle from './src/components/Circle/Circle';

export function wrapPageElement({ element, props }) {
	return (
		<Layout {...props}>
			{element}

			<Circle pathname={props.location.pathname} />
		</Layout>
	);
}
