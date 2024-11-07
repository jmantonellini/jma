import { i18n } from '$lib/i18n';
import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { beforeUpdate } from 'svelte';

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
	let newTheme = null;
	let cookiesTheme = null;
	beforeUpdate(() => {
		newTheme = event.url.searchParams.get('theme');
		cookiesTheme = event.cookies.get('colortheme');
	});
	let theme: string | null = null;

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
