import { type RequestHandler } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { Photo } from '$lib/types';
import { getProxyUrl } from '$lib/server/utils';

export const POST: RequestHandler = async ({ request }) => {
	const { url, description, alt, author } = await request.json();
	try {
		console.log('Creating DB record for:', url);

		await prisma.photo.create({
			data: {
				url,
				description,
				alt,
				author
			}
		});

		return new Response(JSON.stringify({ message: 'Photo metadata stored successfully' }), {
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		console.error('Metadata sotring failed:', error);
		return new Response(JSON.stringify({ error: 'Metadata sotring failed' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};

export const GET: RequestHandler = async ({ url }) => {
	const cursor = url.searchParams.get('cursor');

	const limit = 20;

	const photos = await prisma.photo.findMany({
		take: limit,
		skip: cursor ? 1 : 0,
		cursor: cursor ? { id: parseInt(cursor) } : undefined,
		orderBy: { id: 'desc' }
	});

	const photosWithProxy = photos.map((photo: Photo) => ({
		...photo,
		proxyUrl: getProxyUrl(photo.url, { width: 800, format: 'webp' })
	}));

	return new Response(
		JSON.stringify({
			photos: photosWithProxy,
			nextCursor: photosWithProxy.length ? photosWithProxy[photosWithProxy.length - 1].id : null
		})
	);
};
