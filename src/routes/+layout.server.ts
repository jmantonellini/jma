import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, depends, url }) => {
	depends('paraglide_lang');
	return { user: locals.user, url: url.pathname };
};
