import { error, fail, redirect } from '@sveltejs/kit';
import type { Action, Actions, PageServerLoad } from './$types';
import bcrypt from 'bcryptjs';
import { prisma } from '$lib/server/prisma';
import { Roles } from '$lib';
import { localizeUrl } from '$lib/paraglide/runtime';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		return redirect(302, localizeUrl('/'));
	}
};

const register: Action = async ({ request }) => {
	const data = await request.formData();
	const username = data.get('username');
	const password = data.get('password');

	if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
		return error(400, 'Username and Password must be a string');
	}

	try {
		const existingUser = await prisma.user.findUnique({
			where: { username }
		});

		if (existingUser) {
			return fail(400, { user: true });
		}

		await createUser(username, password);
	} catch (error) {
		console.error('Error during user registration:', error);
		return fail(500, { error: 'Internal server error' });
	}
	return redirect(303, localizeUrl('/login'));
};

async function createUser(username: string, password: string) {
	const passwordHash = await bcrypt.hash(password, 10);

	await prisma.user.create({
		data: {
			username,
			passwordHash,
			userAuthToken: crypto.randomUUID(),
			role: { connect: { name: Roles.USER } }
		}
	});
}

export const actions: Actions = { register };
