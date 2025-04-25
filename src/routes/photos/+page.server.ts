import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import { getProxyUrl } from '$lib/server/utils';
import type { Photo } from '$lib/types';

export const load: PageServerLoad = async () => {
	const photos = await prisma.photo.findMany();

	const photosWithProxy = photos.map((photo: Photo) => {
		try {
			const proxyUrl = getProxyUrl(photo.url, { width: 800, format: 'webp' });

			return { ...photo, proxyUrl };
		} catch (err) {
			console.error(`Error firmando ${photo.url}:`, err);
			return { ...photo, proxyUrl: null };
		}
	});

	return {
		photos: photosWithProxy
	};
};
