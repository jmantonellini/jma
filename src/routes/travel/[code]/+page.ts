import { error } from '@sveltejs/kit';
import { languageTag } from '$lib/paraglide/runtime';
import type { PageLoad } from './$types';
import matter from 'gray-matter';
import { marked } from 'marked';

export const load: PageLoad = async ({ params }) => {
	try {
		const code = params.code.toLowerCase();
		const lang = languageTag();

		// const paths = import.meta.glob(`/src/countries/${code}/*.md`, { eager: true, as: 'raw' });
		const paths = import.meta.glob(`/src/countries/**/*.md`, {
			eager: true,
			query: '?raw',
			import: 'default'
		});
		console.log('PATHS', paths);
		const postPath = `/src/countries/${code}/${code}-${lang}.md`;
		console.log('POSTPATH', postPath);
		const post = paths[postPath];
		console.log(post);
		const { content, data } = matter(post as string);
		const htmlContent = marked(content);

		if (!post) {
			throw error(404, 'Country not found');
		}

		return {
			content: htmlContent,
			meta: data
		};
	} catch (e) {
		console.log(e);
		throw error(404, `Could not find ${params.code} country`);
	}
};
