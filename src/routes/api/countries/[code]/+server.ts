import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { RequestHandler } from './$types';
import { languageTag } from '$lib/paraglide/runtime';

export const GET: RequestHandler = async ({ params, url }) => {
	const country = await prisma.countryTranslations.findFirst({
		where: {
			countryCode: {
				equals: params.code,
				mode: 'insensitive'
			},
			languageCode: {
				equals: url.searchParams.get('lang') || languageTag(),
				mode: 'insensitive'
			}
		}
	});

	return json(country);
};
