import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { RequestHandler } from './$types';
import { getLocale } from '$lib/paraglide/runtime';

export const GET: RequestHandler = async ({ params, url }) => {
	let lang = null;
	$effect.pre(() => {
		lang = url.searchParams.get('lang');
	});
	const country = await prisma.countryTranslations.findFirst({
		where: {
			countryCode: {
				equals: params.code,
				mode: 'insensitive'
			},
			languageCode: {
				equals: lang || getLocale(),
				mode: 'insensitive'
			}
		}
	});

	return json(country);
};
