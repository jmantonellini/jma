import { i18n } from '$lib/i18n';
import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const userSession: Handle = async ({ event, resolve }) => {
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
	let theme: string | null = null;
	const newTheme = event.url.searchParams.get('theme');
	const cookiesTheme = event.cookies.get('colortheme');

	if (newTheme) {
		theme = newTheme;
	} else if (cookiesTheme) {
		theme = cookiesTheme;
	}

	if (theme) {
		return await resolve(event, {
			transformPageChunk: ({ html }) => html.replace('data-theme=""', `data-theme="${theme}"`)
		});
	}

	return await resolve(event);
};

export const handle: Handle = sequence(userSession, i18n.handle(), themeHandler);
