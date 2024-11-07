export type MetaData = {
	title: string;
	description: string;
	date: string;
	categories: string[];
	published: boolean;
};

export type Post = MetaData & {
	slug: string;
};
