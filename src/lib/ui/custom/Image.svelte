<script lang="ts">
import { onMount } from 'svelte';
type Props = {
	src: string;
	alt: string;
};

let { src, alt }: Props = $props();

let loaded = $state(false);
let failed = $state(false);
let loading = $state(false);

onMount(() => {
	const img = new Image();
	img.src = src;
	loading = true;

	img.onload = () => {
		loading = false;
		loaded = true;
	};
	img.onerror = () => {
		loading = false;
		failed = true;
	};
});
</script>

{#if loaded}
	<img src={src} alt="Document" />
{:else if failed}
	<img src="https://icon-library.com/images/not-found-icon/not-found-icon-20.jpg" alt="Not Found" />
{:else if loading}
	<img src="https://c.tenor.com/On7kvXhzml4AAAAi/loading-gif.gif" alt="Loading..." />
{/if}
