import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { slugify } from '$lib';
import { getProxyUrl } from '$lib/server/utils';
import { prisma } from '$lib/server/prisma';
import { env } from '$env/dynamic/private';

const SITE_URL = env.SITE_URL;

export const load: PageServerLoad = async ({ params }) => {
	try {
		if (!params.slug) return { post: null };

		const post = await prisma.post.findUnique({
			where: { slug: params.slug }
		});

		if (!post) throw redirect(303, '/posts');

		return {
			post
		};
	} catch (error) {
		console.log(error);
	}
};

export const actions: Actions = {
	default: async ({ request, locals, fetch }) => {
		const formData = await request.formData();

		const id = formData.get('id')?.toString();
		const slug = formData.get('slug')?.toString();
		const title = formData.get('title')?.toString();
		const description = formData.get('description')?.toString();
		const content = formData.get('content')?.toString();
		const intent = formData.get('intent')?.toString();
		const file = formData.get('coverFile') as File | null;

		console.log('🎯 Form fields received:', {
			title,
			description,
			content,
			intent,
			id,
			slug,
			file
		});

		if (!title || !description || !content || !intent) {
			return fail(400, { message: 'Missing fields' });
		}

		let coverUrl: string | undefined;
		let proxyUrl: string | undefined;

		if (!file || file.size === 0) {
			console.warn('⚠️ No cover file received or file is empty');
		}

		if (file && file.size > 0 && file.name) {
			try {
				const bucketParam = 'posts';
				const res = await fetch(
					`${SITE_URL}/api/photos/url?name=${file.name}&bucket=${bucketParam}`,
					{
						headers: { 'x-human-verified': 'true' }
					}
				);

				if (!res.ok) {
					console.error('❌ Error getting signed URL:', await res.text());
					return fail(500, { message: 'Could not get signed URL' });
				}
				const { preSignedUrl, permanentUrl } = await res.json();

				const uploadRes = await fetch(preSignedUrl, {
					method: 'PUT',
					headers: {
						'Content-Type': file.type
					},
					body: file
				});

				if (!uploadRes.ok) {
					console.error('❌ Error uploading image to S3:', await uploadRes.text());
					return fail(500, { message: 'Image upload to S3 failed' });
				}

				coverUrl = permanentUrl;
				proxyUrl = getProxyUrl(permanentUrl, { width: 800, format: 'webp' });

				console.log('✅ Image uploaded to:', coverUrl);
			} catch (err) {
				console.error('❌ Unexpected error uploading cover image:', err);
				return fail(500, { message: 'Unexpected error uploading image' });
			}
		}

		const isEdit = !!id;

		if (isEdit) {
			await prisma.post.update({
				where: { id: Number(id) },
				data: {
					title,
					description,
					content,
					published: intent === 'publish',
					...(coverUrl && { coverImage: coverUrl }),
					...(proxyUrl && { proxyUrl })
				}
			});

			return redirect(303, `/posts/${slug}`);
		} else {
			const newSlug = slugify(title);

			await prisma.post.create({
				data: {
					title,
					description,
					content,
					slug: newSlug,
					published: intent === 'publish',
					coverImage: coverUrl,
					proxyUrl,
					author: {
						connect: {
							id: locals.user?.id
						}
					}
				}
			});

			return redirect(303, `/posts/${newSlug}`);
		}
	}
};
