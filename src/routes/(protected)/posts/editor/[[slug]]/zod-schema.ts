import z from 'zod';

export const PostSchema = z.object({
	title: z.string().min(1).max(100),
	description: z.string().min(1).max(200),
	postContent: z.string(),
	intent: z.string(),
	id: z.int().optional(),
	slug: z.string().optional(),
	coverFile: z
		.instanceof(File)
		.refine((f) => f.size < 100_000, 'Max 100 kB upload size.')
		.optional()
});
