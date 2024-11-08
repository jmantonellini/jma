import type { Actions } from '@sveltejs/kit';
import { beforeUpdate } from 'svelte';

export const actions: Actions = {
	setTheme: async ({ url, cookies }) => {
		let theme = null;
		beforeUpdate(() => {
			theme = url.searchParams.get('theme');
		});

		if (theme) {
			cookies.set('colortheme', theme, {
				path: '/',
				maxAge: 60 * 60 * 24 * 365
			});
		}
	}
};
