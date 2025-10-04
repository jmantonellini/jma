import { getLocale, localizeUrl } from '$lib/paraglide/runtime';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const rawCode = params.code;

	if (!rawCode || rawCode === 'undefined') {
		throw redirect(302, localizeUrl('/travel'));
	}

	const code = rawCode.toLowerCase();
	const lang = getLocale();

	// call your API endpoint
	const res = await fetch(`/api/countries/${code}?lang=${lang}`);
	if (!res.ok) {
		throw redirect(307, localizeUrl('/travel'));
	}

	const translation = await res.json();

	// if no translation was found, redirect
	if (!translation) {
		throw redirect(307, localizeUrl('/travel'));
	}

	return {
		translation,
		code,
		lang
	};
};
