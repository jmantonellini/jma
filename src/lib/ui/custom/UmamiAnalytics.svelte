<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		if (import.meta.env.PROD) {
			const script = document.createElement('script');
			script.async = true;
			script.defer = true;
			script.dataset.websiteId = 'd0547f3f-17b2-4ff0-9c60-5f28f3831c56';
			script.src = 'https://umami.eco-sistema.net/umami.js';
			document.head.appendChild(script);
		}
	});
</script>
