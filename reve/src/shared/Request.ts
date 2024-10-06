import { ErrorResponseBody } from 'interfaces/error';

import axios, { AxiosRequestConfig } from 'axios';
import APIError from 'shared/APIErrors';

import * as Config from 'constants/config';

export default class Request {
	public static async get<T, M = undefined>(url: string, config?: AxiosRequestConfig): Promise<T> {
		try {
			const { data } = await axios.get<T>(url, config);

			return data;
		} catch (error: any) {
			if (!Config.PROD) console.error(error);

			if (error!.response) {
				throw new APIError<M>(error.response!.data as ErrorResponseBody<M>);
			}

			throw error;
		}
	}

	public static async post<T, M = undefined>(url: string, payload?: object, config?: AxiosRequestConfig): Promise<T> {
		try {
			const { data } = await axios.post<T>(url, payload, config);

			return data;
		} catch (error: any) {
			if (!Config.PROD) console.error(error);

			if (error!.response) {
				throw new APIError<M>(error.response!.data as ErrorResponseBody<M>);
			}

			throw error;
		}
	}

	public static async put<T, M = undefined>(url: string, payload?: object, config?: AxiosRequestConfig): Promise<T> {
		try {
			const { data } = await axios.put<T>(url, payload, config);

			return data;
		} catch (error: any) {
			if (!Config.PROD) console.error(error);

			if (error!.response) {
				throw new APIError<M>(error.response!.data as ErrorResponseBody<M>);
			}

			throw error;
		}
	}

	public static async patch<T, M = undefined>(
		url: string,
		payload?: object,
		config?: AxiosRequestConfig
	): Promise<T> {
		try {
			const { data } = await axios.patch<T>(url, payload, config);

			return data;
		} catch (error: any) {
			if (!Config.PROD) console.error(error);

			if (error!.response) {
				throw new APIError<M>(error.response!.data as ErrorResponseBody<M>);
			}

			throw error;
		}
	}

	public static async delete<T, M = undefined>(url: string, config?: AxiosRequestConfig): Promise<T> {
		try {
			const { data } = await axios.delete<T>(url, config);

			return data;
		} catch (error: any) {
			if (!Config.PROD) console.error(error);

			if (error!.response) {
				throw new APIError<M>(error.response!.data as ErrorResponseBody<M>);
			}

			throw error;
		}
	}
}
