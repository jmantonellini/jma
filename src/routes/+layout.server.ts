import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, depends, url }) => {
	depends('paraglide:_lang');
	return { user: locals.user, url: url.pathname };
};
