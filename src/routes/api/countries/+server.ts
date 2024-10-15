import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';

export const GET: RequestHandler = async () => {
	const visitedCountries = await prisma.country.findMany({
		where: {
			visited: true
		}
	});

	return json(visitedCountries);
};
