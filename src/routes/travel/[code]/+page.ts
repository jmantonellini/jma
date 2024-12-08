import { error } from '@sveltejs/kit';
import { languageTag } from '$lib/paraglide/runtime';
import type { PageLoad } from './$types';
import matter from 'gray-matter';

function parseMarkdown(file: string) {
	const { data, content } = matter(file);
	return {
		title: data.title,
		date: data.date,
		description: data.description,
		author: data.author,
		categories: data.categories,
		content
	};
}

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
		const post = paths[postPath] as string;
		console.log(post);
		const { title, author, description, categories, date, content } = parseMarkdown(post);

		if (!post) {
			throw error(404, 'Country not found');
		}

		return {
			title,
			author,
			description,
			date,
			categories,
			content
		};
	} catch (e) {
		console.log(e);
		throw error(404, `Could not find ${params.code} country`);
	}
};
