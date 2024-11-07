<script lang="ts">
import type { SubmitFunction } from '@sveltejs/kit';
import { addToast } from '$stores/toast';
import { applyAction, enhance } from '$app/forms';
import type { ActionData } from './$types';

import * as m from '$lib/paraglide/messages';

export let form: ActionData;

let showPassword = false;
let loading = false;

$: password = showPassword ? 'text' : 'password';

const register: SubmitFunction = () => {
	loading = true;

	return async ({ result }) => {
		loading = false;
		addToast({ message: `${m.user_registered()}! 🥳`, type: 'success' });
		await applyAction(result);
	};
};
</script>

<div class="flex w-full flex-col items-center justify-center space-y-8">
	<h2>{m.join_the_platform()} 🤗</h2>
	<form
		action="?/register"
		method="post"
		class="flex flex-col gap-4 lg:gap-8"
		use:enhance={register}
	>
		<label for="username" class="form-control">
			<div class="label">
				<span class="label-text">{m.username()}</span>
			</div>
			<input class="input input-primary" id="username" name="username" type="text" required />
		</label>
		<label for="password" class="form-control">
			<div class="label">
				<span class="label-text">{m.password()}</span>
				<input
					type="checkbox"
					title={m.show_password()}
					bind:checked={showPassword}
					id="showPassword"
					class="checkbox-primary checkbox"
				/>
			</div>
			<input class="input input-primary" id="password" name="password" type={password} required />
		</label>

		{#if form?.user}
			<p class="error">Username is taken.</p>
		{/if}

		<button type="submit" class="btn btn-primary mt-4">
			{m.register()}
			{#if loading}
				<span class="loading loading-spinner"></span>
			{/if}
		</button>
	</form>
</div>
