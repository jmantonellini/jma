<script lang="ts">
import WorldMap from './WorldMap.svelte';
import type { PageData } from './$types';

export let data: PageData;

const visitedCountries = data.visitedCountries;
let smallDevice = false;

const attachListener = () => {
	const mediaQuery = window.matchMedia('(width <= 640px)');

	mediaQuery.addEventListener('change', ({ matches }) => {
		smallDevice = matches;
	});
};
</script>

<svelte:window on:resize={attachListener} />

<main class="flex flex-col items-center gap-2 lg:gap-8">
	<h1>Travel guide</h1>
	<div class={`grid gap-4 lg:gap-8 ${smallDevice ? 'grid-rows-2' : 'grid-cols-2'}`}>
		<WorldMap smallDevice={smallDevice} visitedCountries={visitedCountries} />
		<div>Contenido del país</div>
	</div>
</main>
