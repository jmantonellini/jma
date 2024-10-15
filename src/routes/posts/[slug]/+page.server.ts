import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	try {
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
