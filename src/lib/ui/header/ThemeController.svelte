<script lang="ts">
import { browser } from '$app/environment';
import { enhance } from '$app/forms';
import { capitalize } from '$lib';
import type { SubmitFunction } from '@sveltejs/kit';
import { onMount } from 'svelte';

const themes = {
	light: '🔆',
	sunset: '🌙',
	retro: '📺',
	cyberpunk: '🔌'
};

let theme = themes.sunset;

onMount(() => {
	let themeName = document.documentElement.getAttribute('data-theme') as keyof typeof themes;
	if (!themeName) {
		themeName = themes.sunset;
	}
	if (browser) {
		document.cookie = 'colortheme=' + themeName;
	}
	theme = themes[themeName];
});

const submitUpdateTheme: SubmitFunction = ({ action }) => {
	const params = new URLSearchParams(action.search);
	const newTheme = params.get('theme');

	if (newTheme) {
		document.documentElement.setAttribute('data-theme', newTheme);
		theme = themes[newTheme as keyof typeof themes];
	}
};
</script>

<form class="dropdown h-fit" method="post" use:enhance={submitUpdateTheme}>
	<button type="button" class="btn-sm lg:btn" aria-expanded="false" aria-controls="theme-options">
		{theme}
	</button>
	<ul id="theme-options" class="dropdown-content z-[1] mt-2 rounded-btn bg-base-300 shadow-2xl">
		{#each Object.keys(themes) as theme}
			<li>
				<button
					class="theme-controller btn btn-ghost justify-start"
					aria-label={`${capitalize(theme)} theme`}
					formaction={`/?/setTheme&theme=${theme}`}
				>
					{themes[theme]}
				</button>
			</li>
		{/each}
	</ul>
</form>
