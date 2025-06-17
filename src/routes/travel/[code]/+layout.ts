import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch, params }) => {
	const response = await fetch('/api/travel');
	const posts = await response.json();

	return {
		posts,
		code: params.code
	};
};
