<script lang="ts">
import { languageTag } from '$lib/paraglide/runtime';
import WorldMap from './WorldMap.svelte';
import * as m from '$lib/paraglide/messages';
import { fly } from 'svelte/transition';

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

<main class="flex flex-col items-center gap-2 lg:gap-8" out:fly={{ x: 200, duration: 600 }}>
	<header class="flex flex-col items-center">
		<h1>{m.travel_guide()}</h1>
		<p>{m.travel_description()} 🧭</p>
	</header>
	<div class={`flex w-full gap-4 lg:gap-8 ${smallDevice && 'flex-col'}`}>
		<WorldMap
			onSelectCountry={selectCountry}
			smallDevice={smallDevice}
			visitedCountries={data.visitedCountries}
		/>
		<div
			class={`flex flex-col transition-all duration-700 ${!selectedCountry ? 'w-0 opacity-0' : 'w-full opacity-100'}`}
		>
			{#if selectedCountry}
				{#await getCountry()}
					<p>Loading...</p>
				{:then country}
					<h1>
						{selectedCountry?.flag}
						{selectedCountry?.name}
					</h1>
					{@html country?.frontPage}
					<a class="btn btn-secondary btn-sm" href={`/travel/${selectedCountry?.code}`}
						>{m.read_more()}</a
					>
				{/await}
			{/if}
		</div>
	</div>
</main>
