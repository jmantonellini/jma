<script lang="ts">
import { languageTag } from '$lib/paraglide/runtime';
import WorldMap from './WorldMap.svelte';
import * as m from '$lib/paraglide/messages';
import { fade } from 'svelte/transition';
import Compass from '$lib/icons/Compass.svelte';

let { data } = $props();

let smallDevice = $state(false);
let selectedCountry = $state<{ name: string; code: string; flag: string } | null>(null);

const attachListener = () => {
	const mediaQuery = window.matchMedia('(width <= 640px)');
	mediaQuery.addEventListener('change', ({ matches }) => {
		smallDevice = matches;
	});
};

const selectCountry = (country: { name: string; code: string; flag: string } | null) => {
	selectedCountry = country;
	country && getCountry();
};

async function getCountry() {
	const response = await fetch(`/api/countries/${selectedCountry?.code}?lang=${languageTag()}`);
	const data = await response.json();
	if (response.ok) {
		return data;
	} else {
		throw new Error(data);
	}
}
</script>

<svelte:window on:resize={attachListener} />

<main class="flex flex-col items-center gap-2 lg:gap-8">
	<header class="flex flex-col items-center">
		<h1>{m.travel_guide()}</h1>
		<p>{m.travel_description()} 🧭</p>
	</header>
	<div class={`flex w-full gap-4 px-2 lg:gap-8 lg:px-4 ${smallDevice && 'flex-col'}`}>
		<WorldMap
			onSelectCountry={selectCountry}
			smallDevice={smallDevice}
			visitedCountries={data.visitedCountries}
		/>
		{#if selectedCountry}
			<div class="divider opacity-50 divider-secondary divider-horizontal"></div>
		{/if}
		<div
			class={`flex flex-col items-center transition-all duration-700 ${!selectedCountry ? 'w-0 opacity-0' : 'w-full opacity-100'}`}
		>
			{#if selectedCountry}
				{#await getCountry()}
					<div in:fade={{duration: 800}} class="h-full content-center">
						<Compass />
					</div>
				{:then country}
					<div in:fade class="flex h-full w-full flex-col gap-2">
						<h1>
							{selectedCountry?.flag}
							{selectedCountry?.name}
						</h1>
						{@html country?.frontPage}
						<a class="btn btn-primary btn-sm w-fit" href={`/travel/${selectedCountry?.code}`}
							>{m.read_more()}</a
						>
					</div>
				{/await}
			{/if}
		</div>
	</div>
</main>
