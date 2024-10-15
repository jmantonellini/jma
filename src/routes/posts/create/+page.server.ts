import { redirect } from '@sveltejs/kit';
import { base } from '$service-worker';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		return redirect(302, `${base}/posts`);
	}
};
