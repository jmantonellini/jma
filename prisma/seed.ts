import { PrismaClient } from '@prisma/client';
import { countries } from './countries';

const db = new PrismaClient();

type Post = {
	title: string;
	body: string;
};

function slugify(text: string) {
	return text
		.replace(/\s/g, '-')
		.replace(/[^a-zA-Z0-9-]/g, '')
		.toLowerCase();
}

async function getPosts() {
	const response = await fetch('https://dummyjson.com/posts');
	const { posts } = await response.json();

	return posts as Post[];
}

async function main() {
	const posts = await getPosts();

	for (const post of posts) {
		await db.post.create({
			data: {
				title: post.title,
				content: post.body,
				slug: slugify(post.title)
			}
		});
	}

	for (const country of countries)
		await db.country.create({
			data: {
				code: country.code,
				name: country.name
			}
		});
}

main();
