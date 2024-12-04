import { type RequestHandler } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

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
