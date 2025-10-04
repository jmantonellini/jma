import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { getLocale } from '$lib/paraglide/runtime';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, url }) => {
	const lang = url.searchParams.get('lang') ?? getLocale();

	const country = await prisma.country.findUnique({
		where: { code: params.code.toUpperCase() },
		include: {
			post: {
				include: {
					translations: {
						where: { languageCode: lang }
					}
				}
			}
		}
	});

	const translation = country?.post?.translations[0] ?? null;

	return json(translation);
};
