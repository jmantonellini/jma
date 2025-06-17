<script lang="ts">
	import WorldMap from './WorldMap.svelte';
	import * as m from '$lib/paraglide/messages';
	import { goto } from '$app/navigation';

	let { data } = $props();

	let smallDevice = $state(false);
	let selectedCountry = $state<{ name: string; code: string; flag: string } | null>(null);

	const attachListener = () => {
		const mediaQuery = window.matchMedia('(max-width: 640px)');
		smallDevice = mediaQuery.matches;

		mediaQuery.addEventListener('change', ({ matches }) => {
			smallDevice = matches;
		});
	};

	$effect(() => {
		const cleanup = attachListener();
		return cleanup;
	});
</script>

<svelte:window on:resize={attachListener} />

<main class="flex flex-col items-center gap-2 lg:gap-8">
	<header class="flex flex-col items-center">
		<h1>{m.travel_guide()}</h1>
		<p>{m.travel_description()} 🧭</p>
	</header>
	<div class={`flex w-full gap-4 px-2 lg:gap-8 lg:px-4 ${smallDevice && 'flex-col'}`}>
		<WorldMap
			onSelectCountry={(country) => goto(`/travel/${country?.code}`)}
			{smallDevice}
			visitedCountries={data.visitedCountries}
		/>
		{#if selectedCountry}
			<div class="divider opacity-50 divider-secondary divider-horizontal"></div>
		{/if}
	</div>
</main>
