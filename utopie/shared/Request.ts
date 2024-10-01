import axios, { AxiosRequestConfig } from 'axios';

export default class Request {
	public headers: AxiosRequestConfig = {};

	public static async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
		try {
			const { data } = await axios.get<T>(url, config);

			return data;
		} catch (error: any) {
			throw new Error(error.response?.data?.message || error.message || 'Something went wrong!');
		}
	}

	public static async post<T>(url: string, payload?: object, config?: AxiosRequestConfig): Promise<T> {
		try {
			const { data } = await axios.post<T>(url, payload, config);

			return data;
		} catch (error: any) {
			throw new Error(error.response?.data?.message || error.message || 'Something went wrong!');
		}
	}

	public static async patch<T>(url: string, payload?: object, config?: AxiosRequestConfig): Promise<T> {
		try {
			const { data } = await axios.patch<T>(url, payload, config);

			return data;
		} catch (error: any) {
			throw new Error(error.response?.data?.message || error.message || 'Something went wrong!');
		}
	}

	public static async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
		try {
			const { data } = await axios.delete<T>(url, config);

			return data;
		} catch (error: any) {
			throw new Error(error.response?.data?.message || error.message || 'Something went wrong!');
		}
	}
}
