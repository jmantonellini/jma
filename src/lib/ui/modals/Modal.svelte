<script lang="ts">
import type { Snippet } from 'svelte';

let {
	dialog = $bindable(),
	title,
	children
} = $props<{ dialog: HTMLDialogElement; title: Snippet; children: Snippet }>();

const close = () => {
	dialog.close();
};
</script>

<dialog bind:this={dialog} class="modal">
	<div class="modal-box">
		<h3 class="text-lg font-bold">
			{@render title()}
		</h3>
		{@render children()}
		<form method="dialog" class="flex justify-end" onsubmit={close}>
			<button class="btn btn-secondary"> Done! </button>
		</form>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button class="cursor-default">Close</button>
	</form>
</dialog>
