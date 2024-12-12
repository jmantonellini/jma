import { languageTag } from '$lib/paraglide/runtime';
import { json, type RequestHandler } from '@sveltejs/kit';
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
export const GET: RequestHandler = async ({ url }) => {
	const code = url.searchParams.get('code');
	const lang = languageTag();
	const postPath = `/src/countries/${code}/${code}-${lang}.md`;
	const post = await import(postPath);
	const markdown = parseMarkdown(post.default);

	return json(markdown);
};
