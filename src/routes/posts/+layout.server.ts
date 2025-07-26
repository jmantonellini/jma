import { prisma } from '$lib/server/prisma';
import type { Post } from '@prisma/client';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	const posts: Post[] = await prisma.post.findMany({
		select: {
			title: true,
			description: true,
			proxyUrl: true,
			slug: true,
			createdAt: true
		},
		where: { published: true },
		take: 5
	});
	return { posts };
};
