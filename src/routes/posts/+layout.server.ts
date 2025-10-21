import { prisma } from '$lib/server/prisma';
import type { LayoutServerLoad } from './$types';
import { getLocale } from '$lib/paraglide/runtime';
import type { Post } from '@prisma/client';
import { error } from '@sveltejs/kit';

export const load: LayoutServerLoad = async () => {
	const lang = getLocale();
	const posts: Post[] = await prisma.post.findMany({
		include: {
			translations: {
				where: { languageCode: lang.toUpperCase() }
			},
			categories: true
		},
		where: { published: true, countryCode: null },
		take: 5
	});
	
	if (!posts) {
		error(404, {
			message: 'Not found'
		});
	}

	return { posts };
};
