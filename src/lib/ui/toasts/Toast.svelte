<script>
import { fade } from 'svelte/transition';

export let type = 'error';
</script>

<article transition:fade class="toast toast-top toast-center">
	{#if type === "success"}
		<div class="alert alert-success">
			<span>✅ <slot /></span>
		</div>
	{:else if type === "error" || type === "failure"}
		<div class="alert alert-error">
			<span>❌ <slot /></span>
		</div>
	{:else}
		<div class="alert alert-info">
			<span>ℹ️ <slot /></span>
		</div>
	{/if}
</article>
