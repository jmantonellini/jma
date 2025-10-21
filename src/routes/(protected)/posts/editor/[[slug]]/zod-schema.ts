import z from "zod/v4";

export const PostSchema = z.object({
	title: z.string().min(1).max(100),
	description: z.string().min(1).max(200),
	proxyUrl: z.string().optional(),
	content: z.string(),
	published: z.boolean(),
	translate: z.boolean(),
	id: z.int().optional(),
	slug: z.string().optional(),
	countryCode: z.string().optional(),
	coverImage: z.union([
		z.url().optional(),
		z
			.instanceof(File)
			.refine((f) => f.size < 100_000, 'Max 100 kB upload size.')
			.optional()
	])
});
