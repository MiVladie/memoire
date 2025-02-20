import { Device } from 'interfaces/common';

export function isDevice(device: Device): boolean {
	const userAgent = navigator.userAgent;

	switch (device) {
		case Device.iOS:
			return /iPhone|iPad|iPod/.test(userAgent);

		case Device.Android:
			return /Android/.test(userAgent);

		default:
			return true;
	}
}
