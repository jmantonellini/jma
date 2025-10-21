import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import { error, redirect } from '@sveltejs/kit';
import { localizeUrl } from '$lib/paraglide/runtime';
import { getLocale } from '$lib/paraglide/runtime';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const lang = getLocale();

		if (!params.slug) {
			throw redirect(303, localizeUrl('/posts'));
		}

		const post = await prisma.post.findUnique({
			where: { slug: params.slug },
			include: {
				translations: {
					where: {
						languageCode: lang.toUpperCase()
					}
				}
			}
		});

		if (!post?.translations.length) {
			throw error(404, 'Post not found');
		}

		return {
			post
		};
	} catch (error) {
		console.log('SHIT', error);
	}
};
