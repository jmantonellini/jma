import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import { error, redirect } from '@sveltejs/kit';
import { localizeUrl } from '$lib/paraglide/runtime';

export const load: PageServerLoad = async ({ params }) => {
	try {
		if (!params.slug) {
			throw redirect(303, localizeUrl('/posts'));
		}

		const post = await prisma.post.findUnique({
			where: { slug: params.slug }
		});

		if (!post) {
			throw error(404, 'Post not found');
		}
		return {
			post
		};
	} catch (error) {
		console.log(error);
	}
};
