import { redirect, type Actions } from '@sveltejs/kit';
import { zod4 } from 'sveltekit-superforms/adapters';
import { fail, superValidate, withFiles } from 'sveltekit-superforms';

import type { PageServerLoad } from './$types';
import { slugify } from '$lib';
import { getProxyUrl } from '$lib/server/utils';
import { prisma } from '$lib/server/prisma';
import { env } from '$env/dynamic/private';
import { localizeUrl } from '$lib/paraglide/runtime';
import { PostSchema } from './zod-schema';
import { ZodError } from 'zod';

const SITE_URL = env.SITE_URL;

export const load: PageServerLoad = async ({ params }) => {
	const formEmpty = await superValidate(zod4(PostSchema));

	if (!params.slug) return { form: formEmpty };

	const post = await prisma.post.findUnique({
		where: { slug: params.slug }
	});

	const form = await superValidate(post, zod4(PostSchema));
	if (!post) throw redirect(303, localizeUrl('/posts'));

	return {
		form
	};
};

export const actions: Actions = {
	default: async ({ request, locals, fetch }) => {
		try {
			const form = await superValidate(request, zod4(PostSchema));

			if (!form.valid) {
				return fail(400, { form });
			}

			let coverUrl: string | undefined;
			let proxyUrl: string | undefined;

			const { title, description, postContent, published, id, coverImage } = form.data;

			if (coverImage instanceof File && coverImage.size > 0) {
				try {
					const bucketParam = 'posts';
					const res = await fetch(
						`${SITE_URL}/api/photos/url?name=${coverImage.name}&bucket=${bucketParam}`,
						{
							headers: { 'x-human-verified': 'true' }
						}
					);

					if (!res.ok) {
						console.error('❌ Error getting signed URL:');
						return fail(500, { form });
					}
					const { preSignedUrl, permanentUrl } = await res.json();

					const uploadRes = await fetch(preSignedUrl, {
						method: 'PUT',
						headers: {
							'Content-Type': coverImage.type
						},
						body: coverImage
					});

					if (!uploadRes.ok) {
						console.error('❌ Error uploading image to S3:', await uploadRes.text());
						return fail(500, { form, message: 'Image upload to S3 failed' });
					}

					coverUrl = permanentUrl;
					proxyUrl = getProxyUrl(permanentUrl, { width: 800, format: 'webp' });

					console.log('✅ Image uploaded to:', coverUrl);
				} catch (err) {
					console.error('❌ Unexpected error uploading cover image:', err);
					return fail(500, { form, message: 'Unexpected error uploading cover image' });
				}
			} else if (typeof coverImage === 'string') {
				coverUrl = coverImage;
				proxyUrl = getProxyUrl(coverImage, { width: 800, format: 'webp' });
			}

			const isEdit = !!id;

			if (isEdit) {
				await prisma.post.update({
					where: { id: Number(id) },
					data: {
						title,
						description,
						postContent,
						published,
						...(coverUrl && { coverImage: coverUrl }),
						...(proxyUrl && { proxyUrl })
					}
				});
			} else {
				const newSlug = slugify(title);
				console.info('Creating post with slug:', newSlug);

				await prisma.post.create({
					data: {
						title,
						description,
						postContent,
						slug: newSlug,
						published,
						coverImage: coverUrl,
						proxyUrl,
						author: {
							connect: {
								id: locals.user?.id
							}
						}
					}
				});
			}
			return withFiles({ form });
		} catch (error) {
			if (error instanceof ZodError) {
				return fail(400, { message: error.message });
			}
			return fail(400, { message: 'FAILED POST SAVE' });
		}
	}
};
