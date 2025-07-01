<script lang="ts">
	import { fly } from "svelte/transition";

	type Props = { side: 'left' | 'right' };
	let { side }: Props = $props();
</script>

<div in:fly={{ x: side === 'left' ? -100 : 100, duration: 600 }} class={`flex min-h-0 h-auto items-center w-full gap-4 lg:gap-8 px-4 lg:px-8 ${side === 'left' && 'flex-row-reverse'}`}>
	<div class="h-full w-1 bg-primary"></div>
	<div class="w-full h-0.5 bg-secondary"></div>
</div>
