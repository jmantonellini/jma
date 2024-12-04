<script lang="ts">
import type { Toast } from '$lib/types';
import { getToastState } from '$states/toast.svelte';
import { fade, fly } from 'svelte/transition';

type Props = {
	toast: Toast;
};

let { toast }: Props = $props();
const toastState = getToastState();

function handleClick() {
	toastState.remove(toast.id);
}
</script>

<button
	onclick={handleClick}
	in:fly={{ y: -20 }}
	out:fade
	class="relative flex min-w-fit whitespace-nowrap"
	aria-label="Close toast"
>
	<div
		class="alert"
		class:alert-success={toast.type === 'success'}
		class:alert-error={toast.type === 'error'}
		class:alert-info={toast.type === 'info'}
	>
		<span>{toast.message}</span>
	</div>
</button>
