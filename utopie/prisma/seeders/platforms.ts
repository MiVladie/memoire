import { PrismaClient } from '@prisma/client';

import { PLATFORMS } from '../../constants/db';

const prisma = new PrismaClient();

export async function seed() {
	const keys = Object.keys(PLATFORMS);

	for (let key of keys) {
		const platform: any = keys[key as any];

		await prisma.platform.upsert({
			where: { id: platform.id },
			update: { name: platform.name, theme: platform.theme },
			create: { id: platform.id, name: platform.name, theme: platform.theme }
		});
	}
}
