<script lang="ts">
import { toasts } from '$stores/toast';

import Toast from './Toast.svelte';
</script>

{#if $toasts}
	<section>
		{#each $toasts as toast (toast.id)}
			<Toast type={toast.type}>{toast.message}</Toast>
		{/each}
	</section>
{/if}

<style lang="postcss">
section {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	width: 100%;
	display: flex;
	margin-top: 1rem;
	justify-content: center;
	flex-direction: column;
	z-index: 1000;
}
</style>
