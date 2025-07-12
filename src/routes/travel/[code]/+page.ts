import { getLocale, localizeUrl } from '$lib/paraglide/runtime';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const rawCode = params.code;

	if (!rawCode || rawCode === 'undefined') {
		throw redirect(302, localizeUrl('/travel'));
	}

	const code = rawCode.toLowerCase();
	const lang = getLocale();
	const slug = `${code}-${lang}`;

	const modules = import.meta.glob('/src/countries/**/*.md', { eager: true });
	const path = `/src/countries/${code}/${slug}.md`;

	if (!modules[path]) {
		throw redirect(307, localizeUrl('/travel'));
	}

	return { slug };
};
