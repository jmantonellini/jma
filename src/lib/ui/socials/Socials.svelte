<script lang="ts">
	import { fly } from 'svelte/transition';

	import GitHub from '$lib/icons/GitHub.svelte';
	import Instagram from '$lib/icons/Instagram.svelte';
	import LinkedIn from '$lib/icons/LinkedIn.svelte';
	import Mail from '$lib/icons/Mail.svelte';
	import { onMount } from 'svelte';

	let visible = $state(false);
	onMount(() => {
		setTimeout(() => {
			visible = true;
		}, 500);
	});
</script>

<div class="flex items-center justify-center gap-2 lg:gap-4">
	{#if visible}
		<button
			class="transition-colors hover:animate-bounce hover:text-[#DD2A7B]"
			in:fly={{ y: 100, duration: 150, delay: 600 }}
			onclick={() => window.open('https://www.instagram.com/juanma.antonellini/', '_blank')}
		>
			<Instagram />
		</button>
		<button
			class="transition-colors hover:animate-bounce hover:text-[#02040A]"
			in:fly={{ y: 100, duration: 150, delay: 700 }}
			onclick={() => window.open('https://www.github.com/jmantonellini/', '_blank')}
		>
			<GitHub />
		</button>
		<button
			class="transition-colors hover:animate-bounce hover:text-[#0E76A8]"
			in:fly={{ y: 100, duration: 150, delay: 800 }}
			onclick={() => window.open('https://www.linkedin.com/in/juanma-antonellini/', '_blank')}
		>
			<LinkedIn />
		</button>
		<button
			class="transition-colors hover:animate-bounce hover:text-[#ff3636]"
			in:fly={{ y: 100, duration: 150, delay: 900 }}
			onclick={() => window.open('mailto:juanmantonellini@gmail.com', '_blank')}
		>
			<Mail />
		</button>
	{/if}
</div>
