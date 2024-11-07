import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, depends }) => {
	depends('paraglide:_lang');
	return { user: locals.user };
};
