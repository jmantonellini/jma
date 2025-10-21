import { redirect, type Actions } from '@sveltejs/kit';
import { fail, superValidate } from 'sveltekit-superforms';

import type { PageServerLoad } from './$types';
import { slugify } from '$lib';
import { getProxyUrl } from '$lib/server/utils';
import { prisma } from '$lib/server/prisma';
import { env } from '$env/dynamic/private';
import { localizeUrl } from '$lib/paraglide/runtime';
import { PostSchema } from './zod-schema';
import { zod4 } from 'sveltekit-superforms/adapters';

const SITE_URL = env.SITE_URL;
const GOOGLE_TRANSLATE_API = 'https://translate.googleapis.com/translate_a/single';

async function translateText(
	text: string,
	sourceLang: string,
	targetLang: string
): Promise<string> {
	if (!text.trim()) return text;

	const params = new URLSearchParams({
		client: 'gtx',
		sl: sourceLang,
		tl: targetLang,
		dt: 't',
		q: text
	});

	try {
		// Using Google Translate
		const res = await fetch(`${GOOGLE_TRANSLATE_API}?${params.toString()}`);
		if (!res.ok) throw new Error(`HTTP ${res.status}`);
		const data = await res.json();
		return data[0].map((chunk: any) => chunk[0]).join('');
	} catch (err) {
		console.error(`Translation to ${targetLang} failed:`, err);
		return text; // fallback to original
	}
}

export const load: PageServerLoad = async ({ params }) => {
	const formEmpty = await superValidate(zod4(PostSchema));

	if (!params.slug) {
		const countries = await prisma.country.findMany({
			select: { code: true, name: true, flag: true },
			where: { post: { none: {} } },
			orderBy: { name: 'asc' }
		});

		return {
			form: formEmpty,
			countries
		};
	}

	const post = await prisma.post.findUnique({
		where: { slug: params.slug },
		include: {
			translations: {
				where: {
					languageCode: 'ES' // Default language for editing
				}
			}
		}
	});

	if (!post) throw redirect(303, localizeUrl('/posts'));

	const countries = await prisma.country.findMany({
		select: { code: true, name: true, flag: true },
		where: {
			OR: [{ post: { none: {} } }, { code: post.countryCode ?? undefined }]
		},
		orderBy: { name: 'asc' }
	});

	const serializedCountries = JSON.parse(JSON.stringify(countries));

	// Prepare form with merged Post / Translation
	const formData = {
		title: post.translations[0]?.title,
		description: post.translations[0]?.description,
		content: post.translations[0]?.content,
		published: post.published,
		id: post.id,
		slug: post.slug,
		countryCode: post.countryCode,
		coverImage: post.coverImage,
		translate: false
	};

	const form = await superValidate(formData, zod4(PostSchema));

	return {
		form,
		countries: serializedCountries
	};
};

export const actions: Actions = {
	default: async ({ request, locals, fetch }) => {
		// Validate form
		const form = await superValidate(request, zod4(PostSchema));
		if (!form.valid) return fail(400, { form });

		const { title, description, content, published, id, coverImage, countryCode, translate } =
			form.data;

		const code = countryCode ? String(countryCode).toUpperCase() : null;

		let coverUrl: string | undefined;
		let proxyUrl: string | undefined;

		// Upload image if needed
		if (coverImage instanceof File && coverImage.size > 0) {
			const res = await fetch(`${SITE_URL}/api/photos/url?name=${coverImage.name}&bucket=posts`, {
				headers: { 'x-human-verified': 'true' }
			});

			if (!res.ok) return fail(500, { form, message: 'Error getting signed URL' });

			const { preSignedUrl, permanentUrl } = await res.json();

			const uploadRes = await fetch(preSignedUrl, {
				method: 'PUT',
				headers: { 'Content-Type': coverImage.type },
				body: coverImage
			});

			if (!uploadRes.ok) return fail(500, { form, message: 'Image upload to S3 failed' });

			coverUrl = permanentUrl;
			proxyUrl = getProxyUrl(permanentUrl, { width: 800, format: 'webp' });
		} else if (typeof coverImage === 'string') {
			coverUrl = coverImage;
			proxyUrl = getProxyUrl(coverImage, { width: 800, format: 'webp' });
		}

		// Prepare slug
		const newSlug = code ?? slugify(title);

		// Upsert post
		const post = await prisma.post.upsert({
			where: { id: id ? Number(id) : 0 },
			update: {
				slug: newSlug,
				published,
				...(coverUrl && { coverImage: coverUrl }),
				...(proxyUrl && { proxyUrl }),
				...(code ? { country: { connect: { code } } } : { country: { disconnect: true } }),
				translations: {
					upsert: {
						where: {
							postId_languageCode: {
								postId: id ? Number(id) : 0,
								languageCode: 'ES'
							}
						},
						update: { title, description, content },
						create: { languageCode: 'ES', title, description, content }
					}
				}
			},
			create: {
				slug: newSlug,
				published,
				coverImage: coverUrl,
				proxyUrl,
				...(code ? { country: { connect: { code } } } : {}),
				author: locals.user ? { connect: { id: locals.user.id } } : undefined,
				translations: {
					create: { languageCode: 'ES', title, description, content }
				}
			},
			include: { translations: true }
		});

		// Optionally translate in background
		if (translate) {
			translatePostBackground(post.id, title, content, description).catch(console.error);
		}

		// Redirect after success
		if (code) {
			throw redirect(303, localizeUrl(`/travel/${post.slug}`));
		} else throw redirect(303, localizeUrl(`/posts/${post.slug}`));
	}
};

async function translatePostBackground(
	postId: number,
	spanishTitle: string,
	spanishContent: string,
	spanishDescription?: string
) {
	const languages = ['EN', 'FR', 'PT'];

	for (const lang of languages) {
		try {
			const [translatedTitle, translatedContent, translatedDescription] = await Promise.all([
				translateText(spanishTitle, 'ES', lang),
				translateText(spanishContent, 'ES', lang),
				spanishDescription ? translateText(spanishDescription, 'ES', lang) : Promise.resolve(null)
			]);

			await prisma.translation.upsert({
				where: {
					postId_languageCode: {
						postId,
						languageCode: lang
					}
				},
				update: {
					title: translatedTitle,
					content: translatedContent,
					description: translatedDescription
				},
				create: {
					postId,
					languageCode: lang,
					title: translatedTitle,
					content: translatedContent,
					description: translatedDescription
				}
			});

			console.log(`✅ Translated post ${postId} → ${lang}`);
		} catch (error) {
			console.error(`❌ Failed to translate to ${lang}:`, error);
		}
	}
}
