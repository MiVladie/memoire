import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthStorage } from './interfaces/storage';

import Layout from 'hoc/Layout/Layout';
import Storage from './shared/Storage';
import axios from 'axios';

import SignIn, { Head as SignInHead } from 'routes/signin';
import SignUp, { Head as SignUpHead } from 'routes/signup';
import Recover, { Head as RecoverHead } from 'routes/recover';
import Home, { Head as HomeHead } from 'routes/home';
import Profile, { Head as ProfileHead } from 'routes/profile';

import '@fontsource/graduate';
import '@fontsource/holtwood-one-sc';
import '@fontsource/urbanist';

const router = createBrowserRouter([
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
		path: '/',
		element: (
			<Layout>
				<HomeHead />
				<Home />
			</Layout>
		)
	},
	{
		path: '/profile',
		element: (
			<Layout>
				<ProfileHead />
				<Profile />
			</Layout>
		)
	}
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);

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
