import { error } from '@sveltejs/kit';
import { languageTag } from '$lib/paraglide/runtime';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	try {
		const code = params.code;
		const lang = languageTag();

		const post = await import(`/src/countries/${code}/${code}-${lang}.md`);

		if (!post) {
			throw error(404, 'Country not found');
		}

		return {
			content: post.default,
			meta: post.metadata
		};
	} catch (e) {
		console.log(e);
		throw error(404, `Could not find ${params.code} country`);
	}
};
