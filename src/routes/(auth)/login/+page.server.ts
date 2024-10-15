import { fail, redirect } from '@sveltejs/kit';
import bycript from 'bcryptjs';
import type { Action, Actions, PageServerLoad } from './$types';

import { prisma } from '$lib/server/prisma';
import type { User } from '@prisma/client';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		return redirect(302, '/');
	}
};

const login: Action = async ({ cookies, request }) => {
	const data = await request.formData();
	const username = data.get('username');
	const password = data.get('password');

	if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
		return fail(400, { incorrect: true });
	}

	const user: User = await prisma.user.findUnique({
		where: { username }
	});

	if (!user) {
		return fail(400, { credentials: true });
	}

	const userPassword = await bycript.compare(password, user.passwordHash);

	if (!userPassword) {
		return fail(400, { credentials: true });
	}

	const authenticatedUser = await prisma.user.update({
		where: { username: user.username },
		data: { userAuthToken: crypto.randomUUID() }
	});

	cookies.set('session', authenticatedUser.userAuthToken, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 60 * 24 * 7
	});

	return redirect(303, '/');
};
export const actions: Actions = { login };
