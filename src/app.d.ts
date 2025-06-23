import type { Locale } from '$lib/paraglide/runtime';
import type { PrismaClient } from '@prisma/client';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
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
