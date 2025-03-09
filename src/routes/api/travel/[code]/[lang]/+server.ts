import { json, type RequestHandler } from '@sveltejs/kit';
import matter from 'gray-matter';

const modules: any = import.meta.glob('/src/countries/**/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
});

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

export const GET: RequestHandler = async ({ params }) => {
	const code = params.code;
	const lang = params.lang;

	const postPath = `/src/countries/${code}/${code}-${lang}.md`;
	console.log(postPath);

	const file = modules[postPath];

	if (!file) {
		throw new Error('Post not found');
	}
	const post = parseMarkdown(file);

	return json(post);
};
