import type { Post } from '$lib/types';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch }) => {
	const response = await fetch('/api/travel');
	const posts: Post[] = await response.json();
  
	return { posts };
};
