import React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from 'context/useAuth';

import Layout from 'hoc/Layout/Layout';
import Storage from 'config/storage';
import axios from 'axios';

import SignIn, { Head as SignInHead } from 'routes/signin';
import SignUp, { Head as SignUpHead } from 'routes/signup';
import Recover, { Head as RecoverHead } from 'routes/recover';
import NotFound, { Head as NotFoundHead } from 'routes/404';

import Home, { Head as HomeHead } from 'routes/home';

import * as ReactDOM from 'react-dom/client';

import '@fontsource/graduate';
import '@fontsource/holtwood-one-sc';
import '@fontsource/urbanist';

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<Layout>
				<HomeHead />
				<Home />
			</Layout>
		)
	},
	{
		path: '/signin',
		element: (
			<Layout>
				<SignInHead />
				<SignIn />
			</Layout>
		)
	},
	{
		path: '/signup',
		element: (
			<Layout>
				<SignUpHead />
				<SignUp />
			</Layout>
		)
	},
	{
		path: '/recover',
		element: (
			<Layout>
				<RecoverHead />
				<Recover />
			</Layout>
		)
	},
	{
		path: '*',
		element: (
			<>
				<NotFoundHead />
				<NotFound />
			</>
		)
	}
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	</React.StrictMode>
);

axios.interceptors.request.use(async (config) => {
	const auth = localStorage.getItem(Storage.AUTH);

	// Appending JWT if exists
	try {
		if (!!auth) {
			config.headers.Authorization = `Bearer ${JSON.parse(auth)?.token}`;
		}
	} catch (error) {
		Promise.reject(error);
	}

	return config;
});
