import type { AvailableLanguageTag } from '$lib/paraglide/runtime';
import type { ParaglideLocals } from '@inlang/paraglide-sveltekit';
import type { PrismaClient } from '@prisma/client';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			paraglide: ParaglideLocals<AvailableLanguageTag>;
			user?: {
				name: string;
				role: string;
				id: string;
			};
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	let prisma: PrismaClient;
}

export {};
