import { getLocale } from '$lib/paraglide/runtime';
import type { LayoutServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const load: LayoutServerLoad = async ({ params }) => {
	let code = params.code;
	let locale = getLocale().toUpperCase();
	const posts = await prisma.post.findMany({
		where: {
			countryCode: {
				not: null
			}
		},
		include: {
			country: true,
			translations: {
				where: { languageCode: locale }
			}
		}
	});

	console.log('POSTS', posts);
	

	if (!posts) {
		error(404, {
			message: 'Not found'
		});
	}

	return {
		posts,
		code
	};
};
