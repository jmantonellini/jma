<script lang="ts">
import type { ActionData } from './$types';
import { applyAction, enhance } from '$app/forms';
import { invalidateAll } from '$app/navigation';

import * as m from '$lib/paraglide/messages.js';
import type { SubmitFunction } from '@sveltejs/kit';
import { addToast } from '$stores/toast';

export let form: ActionData;

let loading = false;

const login: SubmitFunction = () => {
	loading = true;

	return async ({ result }) => {
		invalidateAll();
		loading = false;
		addToast({ message: `${m.welcome()}! 😎`, type: 'success' });
		await applyAction(result);
	};
};
</script>

<div class="flex w-full flex-col items-center justify-center space-y-8">
	<h2>{m.welcome()}! 🥳</h2>
	<form
		class="mx-auto flex flex-col gap-4 lg:gap-8"
		action="?/login"
		method="POST"
		use:enhance={login}
	>
		<label for="username" class="form-control">
			<div class="label">
				<span class="label-text">{m.username()}</span>
			</div>
			<input type="text" id="username" name="username" class="input input-primary" required />
		</label>
		<label for="password" class="form-control">
			<div class="label">
				<span class="label-text">{m.password()}</span>
			</div>
			<input type="password" id="password" name="password" class="input input-primary" required />
		</label>

		{#if form?.invalid}
			<p class="error">Username and password is required.</p>
		{/if}

		{#if form?.credentials}
			<p class="error">{m.wrong_credentials()}</p>
		{/if}

		<button class="btn btn-primary" type="submit">
			{m.login()}
			{#if loading}
				<span class="loading loading-spinner"></span>
			{/if}
		</button>
	</form>
</div>
