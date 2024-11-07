import { json } from '@sveltejs/kit';
import { languageTag } from '$lib/paraglide/runtime';
import type { MetaData, Post } from '$lib/types';

async function getCountryPosts() {
	console.log('GET COUNTRIES POST');

	const posts: Post[] = [];
	let paths;
  const lang = languageTag();
	console.log('LANG 2 TAG', lang);
	
	switch (lang) {
		case 'es':
			console.log('ESPANIOL');

			paths = import.meta.glob('/src/countries/*/*-es.md', { eager: true });
			break;
		case 'fr':
			paths = import.meta.glob('/src/countries/*/*-fr.md', { eager: true });
			break;
		case 'pt':
			paths = import.meta.glob('/src/countries/*/*-pt.md', { eager: true });
			break;
		default:
			console.log('INGLES');
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
