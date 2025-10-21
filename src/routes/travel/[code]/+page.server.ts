import { json, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { getLocale, localizeUrl } from '$lib/paraglide/runtime';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const rawCode = params.code;
	if (!rawCode || rawCode === 'undefined') {
		throw redirect(302, localizeUrl('/travel'));
	}
	const code = rawCode.toUpperCase();
	const rawLang = getLocale();
	const lang = rawLang.toUpperCase();

	const country = await prisma.country.findUnique({
		where: { code: code },
		include: {
			post: {
				include: {
					categories: true,
					translations: {
						where: { languageCode: lang.toUpperCase() }
					}
				}
			}
		}
	});

	if (!country || !country.post || country.post.length === 0) {
		return json(null, { status: 404 });
	}

	const post = country.post[0];

	const translation = post.translations[0];

	return {
		post,
		country,
		translation
	};
};
