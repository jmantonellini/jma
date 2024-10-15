import { prisma } from '$lib/server/prisma';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	const posts = await prisma.post.findMany({
		select: {
			title: true,
			slug: true,
			createdAt: true,
		},
		take: 5
	});
	return { posts };
};
