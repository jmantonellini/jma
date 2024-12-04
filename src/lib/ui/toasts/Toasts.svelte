<script lang="ts">
import { getToastState } from '$states/toast.svelte';
import Toast from './Toast.svelte';

const toastState = getToastState();
</script>

{#if toastState.toasts}
	<div class="absolute top-2 z-50 flex w-full flex-col items-center gap-2">
		{#each toastState.toasts as toast (toast.id)}
			<Toast toast={toast} />
		{/each}
	</div>
{/if}
