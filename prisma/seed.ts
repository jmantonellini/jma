import { PrismaClient } from '@prisma/client';
import { countries } from './countries';

const db = new PrismaClient();

async function main() {
	for (const country of countries)
		await db.country.create({
			data: {
				code: country.code,
				name: country.name
			}
		});
}

main();
