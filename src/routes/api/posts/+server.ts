import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';
import { beforeUpdate } from 'svelte';

export const GET: RequestHandler = async ({ url }) => {
	let limit = null;
	let order = null;
	beforeUpdate(() => {
		limit = url.searchParams.get('limit') ?? 30;
		order = url.searchParams.get('order') ?? 'asc';
	});

	const posts = await prisma.post.findMany({ orderBy: { id: order }, take: limit });

	return json(posts);
};
