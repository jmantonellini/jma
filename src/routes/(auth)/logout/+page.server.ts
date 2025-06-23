import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { localizeUrl } from '$lib/paraglide/runtime';

export const load: PageServerLoad = async () => {
	throw redirect(302, localizeUrl('/'));
};

export const actions: Actions = {
	default({ cookies }) {
		cookies.set('session', '', {
			path: '/',
			expires: new Date(0)
		});
		throw redirect(303, localizeUrl('/login'));
	}
};
