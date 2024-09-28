import '@fontsource/graduate';
import '@fontsource/holtwood-one-sc';
import '@fontsource/urbanist';

import React from 'react';

import { AuthStorage } from './src/interfaces/storage';

import Layout from './src/hoc/Layout/Layout';
import Circle from './src/components/Circle/Circle';
import Storage from './src/shared/Storage';

import axios from 'axios';

export function wrapPageElement({ element, props }) {
	return (
		<Layout {...props}>
			<Circle pathname={props.location.pathname} />

			{element}
		</Layout>
	);
}

axios.interceptors.request.use(async (config) => {
	// Appending JWT if exists
	try {
		const { token } = Storage.get<AuthStorage>(['token']);

		if (token != null) {
			config.headers.Authorization = `Bearer ${token}`;
		}
	} catch (error) {
		Promise.reject(error);
	}

	return config;
});
