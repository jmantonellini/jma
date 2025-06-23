import { json } from '@sveltejs/kit';
import { getLocale } from '$lib/paraglide/runtime';
import type { MetaData, Post } from '$lib/types';

async function getCountryPosts() {
	const posts: Post[] = [];
	let paths;
  const lang = getLocale();
	
	switch (lang) {
		case 'es':
			paths = import.meta.glob('/src/countries/*/*-es.md', { eager: true });
			break;
		case 'fr':
			paths = import.meta.glob('/src/countries/*/*-fr.md', { eager: true });
			break;
		case 'pt':
			paths = import.meta.glob('/src/countries/*/*-pt.md', { eager: true });
			break;
		default:
			paths = import.meta.glob('/src/countries/*/*-en.md', { eager: true });
			break;
	}

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').pop()?.split('-')[0] ?? '';
		if (file && typeof file === 'object' && slug && 'metadata' in file) {
			const metadata = file.metadata as MetaData;
			const post = { ...metadata, slug } satisfies Post;
			if (post.published) posts.push(post);
		}
	}

	posts.sort((first, second) => new Date(second.date).getTime() - new Date(first.date).getTime());

	return posts;
}

export const GET = async () => {
	const posts = await getCountryPosts();

	return json(posts);
};
