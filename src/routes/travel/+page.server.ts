import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	try {
		const visitedCountries = await prisma.country.findMany({
			where: { visited: true }
		});

		if (!visitedCountries) {
			throw error(404, 'Post not found');
		}

		return {
			visitedCountries
		};
	} catch (error) {
		console.log(error);
	}
};
