import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import { slugify } from '$lib';
import { base } from '$service-worker';

export const load: PageServerLoad = async () => {
	return {
		posts: await prisma.post.findMany()
	};
};

export const actions: Actions = {
	createPost: async ({ request, locals }) => {
		const { title, content, description } = Object.fromEntries(await request.formData()) as {
			title: string;
			content: string;
			description: string;
		};
		const slug = slugify(title);

		try {
			await prisma.post.create({
				data: {
					title,
					content,
					description,
					slug: slug,
					author: {
						connect: {
							id: locals.user?.id
						}
					}
				}
			});
		} catch (error) {
			console.error(error);
			return fail(500, { mesage: 'Could not create the post' });
		}
		return redirect(303, `${base}/posts/${slug}`);
	},
	deletePost: async ({ request }) => {
		const formData = await request.formData();
		const postId = Number(formData.get('id'));
		try {
			await prisma.post.delete({
				where: {
					id: postId
				}
			});
		} catch (error) {
			console.error(error);
			return fail(500, { mesage: 'Could not delete the post' });
		}
		return { success: true };
	},
	editPost: async ({ request }) => {
		const formData = await request.formData();
		const postId = Number(formData.get('id'));
		const slug = formData.get('slug');

		const title = formData.get('title');
		const content = formData.get('content');
		try {
			await prisma.post.update({
				where: {
					id: postId
				},
				data: {
					title,
					content
				}
			});
		} catch (error) {
			console.error(error);
			return fail(500, { mesage: 'Could not update the post' });
		}
		return redirect(303, `${base}/posts/${slug}`);
	}
};
