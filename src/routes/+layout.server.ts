import type { LayoutServerLoad } from './$types';

export const prerender = true;

export const load: LayoutServerLoad = async ({ locals, depends }) => {
	depends('paraglide:_lang');
	return { user: locals.user };
};
