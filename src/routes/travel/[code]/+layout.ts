import { getLocale } from '$lib/paraglide/runtime';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch, params }) => {
	let locale = getLocale();
	const response = await fetch(`/api/travel/${locale}`);
	const posts = await response.json();

	return {
		posts,
		code: params.code
	};
};
