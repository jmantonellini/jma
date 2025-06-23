import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { localizeHref, localizeUrl } from '$lib/paraglide/runtime';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user) {
		return redirect(302, localizeUrl('/'));
	}
};
