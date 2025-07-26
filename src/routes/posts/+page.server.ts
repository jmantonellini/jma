import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getS3Client } from '$lib/server/aws';

function getS3KeyFromUrl(url: string) {
	const match = url.match(/amazonaws\.com\/(.+)$/);
	return match ? match[1] : null;
}

export const actions: Actions = {
	deletePost: async ({ request }) => {
		const formData = await request.formData();
		const postId = Number(formData.get('id'));

		try {
			const post = await prisma.post.findUnique({
				where: { id: postId }
			});

			if (!post) return fail(404, { message: 'Post not found' });

			const key = post.coverImage ? getS3KeyFromUrl(post.coverImage) : null;

			if (key) {
				const s3Client = getS3Client();
				await s3Client.send(
					new DeleteObjectCommand({
						Bucket: process.env.AWS_POSTS_BUCKET,
						Key: key
					})
				);
			}

			await prisma.post.delete({
				where: { id: postId }
			});
		} catch (error) {
			console.error(error);
			return fail(500, { message: 'Could not delete the post' });
		}

		return { success: true };
	}
};
