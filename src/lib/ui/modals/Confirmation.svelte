<script lang="ts">
import { enhance } from '$app/forms';
import type { SubmitFunction } from '@sveltejs/kit';

export let dialog: HTMLDialogElement;
export let action;
export let enhanceFunction: SubmitFunction;
export let id = 0;

const close = () => {
	dialog.close();
};
</script>

<dialog bind:this={dialog} on:close class="modal">
	<div class="modal-box">
		<h3 class="text-lg font-bold"><slot name="title">Are you sure?</slot></h3>
		<p class="py-4"><slot name="description">Please confirm before executing order 66</slot></p>
		<form class="flex justify-end" method="POST" action={action} on:submit={close} use:enhance={enhanceFunction}>
			<input type="hidden" name="id" value={id} />
			<button class="btn btn-secondary" type="submit">
				<slot name="confirm">Confirm</slot>
			</button>
		</form>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button class="cursor-default">close</button>
	</form>
</dialog>
