<script lang="ts">
import { enhance } from '$app/forms';
import type { SubmitFunction } from '@sveltejs/kit';
import type { Snippet } from 'svelte';

let {
	enhanceFunction,
	dialog = $bindable(),
	action,
	id = 0,
	title = 'Are you sure?',
	confirm = 'Confirm',
	description = 'Please confirm before executing order 66'
} = $props<{
	dialog: HTMLDialogElement;
	action: string;
	id: number;
	title: Snippet;
	confirm: Snippet;
	description: Snippet;
	enhanceFunction: SubmitFunction;
}>();

const close = () => {
	dialog.close();
};
</script>

<dialog bind:this={dialog} class="modal">
	<div class="modal-box">
		<h3 class="text-lg font-bold">
			{@render title()}
		</h3>
		<p class="py-4">
			{@render description()}
		</p>
		<form
			class="flex justify-end"
			method="post"
			action={action}
			onsubmit={close}
			use:enhance={enhanceFunction}
		>
			<input type="hidden" name="id" value={id} />
			<button class="btn btn-secondary" type="submit">
				{@render confirm()}
			</button>
		</form>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button class="cursor-default">close</button>
	</form>
</dialog>
