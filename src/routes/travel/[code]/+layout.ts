import { getLocale, localizeHref } from '$lib/paraglide/runtime';
import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch, params }) => {
	let locale = getLocale();
	let response;
	try {
		response = await fetch(`/api/travel/${locale}`);
	} catch (error) {
		console.log('ERROR', error);

		redirect(302, localizeHref('/travel'));
	}
	const posts = await response?.json();

	return {
		posts,
		code: params.code
	};
};
