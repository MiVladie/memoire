import { PrismaClient } from '@prisma/client';

import * as Platforms from './platforms';

const prisma = new PrismaClient();

async function main() {
	try {
		await Platforms.seed();
	} catch (error) {
		console.log(error);

		process.exit(1);
	} finally {
		prisma.$disconnect();
	}
}

main();
