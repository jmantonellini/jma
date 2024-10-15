import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';

export const GET: RequestHandler = async ({ url }) => {
	const limit = url.searchParams.get('limit') ?? 30;
	const order = url.searchParams.get('order') ?? 'asc';

	const posts = await prisma.post.findMany({ orderBy: { id: order }, take: limit });

	return json(posts);
};
