import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { RequestHandler } from './$types';
import { languageTag } from '$lib/paraglide/runtime';
import { beforeUpdate } from 'svelte';

export const GET: RequestHandler = async ({ params, url }) => {
	let lang = null;
	beforeUpdate(() => {
		lang = url.searchParams.get('lang');
	});
	const country = await prisma.countryTranslations.findFirst({
		where: {
			countryCode: {
				equals: params.code,
				mode: 'insensitive'
			},
			languageCode: {
				equals: lang || languageTag(),
				mode: 'insensitive'
			}
		}
	});

	return json(country);
};
