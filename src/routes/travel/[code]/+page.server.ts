import { languageTag } from '$lib/paraglide/runtime';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const code = params.code.toLowerCase();
	const lang = languageTag();

	const slug = `${code}-${lang}`;
	return { slug };
};
