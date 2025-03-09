import { languageTag } from '$lib/paraglide/runtime';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, fetch }) => {
	try {
		const code = params.code.toLowerCase();
		const lang = languageTag();

		const reponse = await fetch(`/api/travel/${code}/${lang}`);
		const post = await reponse.json();

		return post;
	} catch (e) {
		console.log(e);
		throw error(404, `Could not find ${params.code} country`);
	}
};
