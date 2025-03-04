import { PrismaClient } from '@prisma/client';

import { Platform } from '@/constants';

const prisma = new PrismaClient();

export async function seed() {
	const keys = Object.keys(Platform) as Array<keyof typeof Platform>;

	for (let key of keys) {
		const { id, name } = Platform[key];

		await prisma.platform.upsert({
			where: { id },
			update: { name },
			create: { id, name }
		});
	}
}
