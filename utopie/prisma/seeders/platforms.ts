import { PrismaClient } from '@prisma/client';

import { PLATFORMS } from '../../constants/db';

const prisma = new PrismaClient();

export async function seed() {
	for (let platform of PLATFORMS) {
		await prisma.platform.upsert({
			where: { name: platform.name },
			update: { name: platform.name },
			create: { name: platform.name, theme: platform.theme }
		});
	}
}
