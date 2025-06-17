import { i18n } from '$lib/i18n';
import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const userSession: Handle = async ({ event, resolve }) => {
	const token = event.request.headers.get('x-human-verified');
	if (!token && event.url.pathname.startsWith('/api/secure-data')) {
		return new Response('Unauthorized', { status: 401 });
	}
	const ua = event.request.headers.get('user-agent') || '';
	const knownBots = ['GPTBot', 'Bytespider', 'YandexBot', 'AhrefsBot', 'MJ12bot'];

	if (knownBots.some((bot) => ua.includes(bot))) {
		return new Response('Access denied for bots', { status: 403 });
	}

	const session = event.cookies.get('session');

	if (!session) {
		return await resolve(event);
	}

	const user = await prisma.user.findUnique({
		where: { userAuthToken: session },
		select: {
			username: true,
			role: true,
			id: true
		}
	});

	if (user) {
		event.locals.user = {
			name: user.username,
			role: user.role.name,
			id: user.id
		};
	}
	return await resolve(event);
};

export const themeHandler: Handle = async ({ event, resolve }) => {
	const newTheme = event.url.searchParams.get('theme');
	const cookiesTheme = event.cookies.get('colortheme');

	const theme = newTheme || cookiesTheme || 'sunset';

	if (newTheme && newTheme !== cookiesTheme) {
		event.cookies.set('colortheme', newTheme, {
			path: '/',
			maxAge: 60 * 60 * 24 * 365 // 1 año
		});
	}

	return await resolve(event, {
		transformPageChunk: ({ html }) => html.replace('data-theme=""', `data-theme="${theme}"`)
	});
};

export const handle: Handle = sequence(userSession, i18n.handle(), themeHandler);
