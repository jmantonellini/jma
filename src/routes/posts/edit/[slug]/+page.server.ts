import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	try {
		const post = await prisma.post.findUnique({
			where: { slug: params.slug },
			select: {
				id: true,
				title: true,
				content: true,
        description: true,
				authorId: true
			}
		});

		if (locals.user?.id !== post?.authorId) {
			throw error(404, 'You are not authorized to edit this post');
		}

		return {
			post
		};
	} catch (error) {
		console.log(error);
	}
};
