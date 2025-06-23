import { getLocale } from '$lib/paraglide/runtime';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const code = params.code.toLowerCase();
	const lang = getLocale();

	const slug = `${code}-${lang}`;
	return { slug };
};
