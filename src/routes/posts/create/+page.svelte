<script lang="ts">
import { applyAction, enhance } from '$app/forms';

import * as m from '$lib/paraglide/messages';
import type { SubmitFunction } from '@sveltejs/kit';
import { invalidateAll } from '$app/navigation';
import { addToast } from '$stores/toast';
import { base } from '$app/paths';

let loading = false;

const createPost: SubmitFunction = () => {
	loading = true;

	return async ({ result }) => {
		invalidateAll();
		loading = false;
		addToast({ message: `${m.post_created()}! 😎`, type: 'success' });
		await applyAction(result);
	};
};
</script>

<div class="grid grid-rows-[auto_1fr] gap-4">
	<h1>{m.create_post()}</h1>

	<form
		class="flex w-1/2 flex-col gap-2 lg:gap-4"
		method="POST"
		action={`${base}/posts?/createPost`}
		use:enhance={createPost}
	>
		<label for="title" class="form-control">
			<div class="label">
				<span class="label-text">{m.title()}</span>
			</div>
			<input
				type="text"
				name="title"
				placeholder={m.post_title()}
				class="input input-primary w-full"
				required
			/>
		</label>
		<label for="description" class="form-control">
			<div class="label">
				<span class="label-text">{m.description()}</span>
			</div>
			<input
				type="text"
				name="description"
				placeholder="Type here"
				class="input input-primary w-full"
				required
			/>
		</label>
		<label class="form-control" for="content">
			<div class="label">
				<span class="label-text">{m.content()}</span>
			</div>
			<textarea
				name="content"
				class="textarea textarea-primary textarea-md min-h-80 w-full resize-none"
				placeholder="Blog content"
				required
			/>
		</label>
		<button type="submit" class="btn btn-primary"
			>{m.publish()}
			{#if loading}
				<span class="loading loading-spinner"></span>
			{/if}
		</button>
	</form>
</div>
