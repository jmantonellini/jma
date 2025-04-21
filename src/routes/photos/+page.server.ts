import { prisma } from '$lib/server/prisma';
import type { Photo } from '$lib/types';
import { getProxyUrl } from '$lib/server/utils.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const photos = await prisma.photo.findMany();

	const photosWithProxy = photos.map((photo: Photo) => {
		try {
			console.log();

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
