import { prisma } from '$lib/server/prisma';
import { getProxyUrl } from '$lib/server/utils';
import type { PageServerLoad } from './$types';
import type { Photo } from '$lib/types';

export const load: PageServerLoad = async () => {
	const limit = 10;

	const photos = await prisma.photo.findMany({
		take: limit,
		orderBy: { id: 'desc' }
	});

	const photosWithProxy = photos.map((photo: Photo) => ({
		...photo,
		proxyUrl: getProxyUrl(photo.url, { width: 800, format: 'webp' })
	}));

	return {
		photos: photosWithProxy,
		nextCursor: photosWithProxy.length ? photosWithProxy[photosWithProxy.length - 1].id : null
	};
};
