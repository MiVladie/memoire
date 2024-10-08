import { PrismaClient } from '@prisma/client';

import { PLATFORMS } from '../../constants/db';

const prisma = new PrismaClient();

export async function seed() {
	const keys = Object.keys(PLATFORMS) as Array<keyof typeof PLATFORMS>;

	for (let key of keys) {
		const { id, name, theme } = PLATFORMS[key];

		await prisma.platform.upsert({
			where: { id },
			update: { name, theme },
			create: { id, name, theme }
		});
	}
}
