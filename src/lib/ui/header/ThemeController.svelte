<script lang="ts">
import { enhance } from '$app/forms';
import { capitalize } from '$lib';
import type { SubmitFunction } from '@sveltejs/kit';
import { onMount } from 'svelte';

const themes = {
	light: '🔆',
	dark: '🌙',
	retro: '📺',
	cyberpunk: '🔌'
};

let theme = themes.dark;

onMount(() => {
	const themeName = document.documentElement.getAttribute('data-theme') as keyof typeof themes;
	theme = themes[themeName];
});

const submitUpdateTheme: SubmitFunction = ({ action }) => {
	const params = new URLSearchParams(action.search);
	const newTheme = params.get('theme');
	console.log(action);

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
	<ul id="theme-options" class="dropdown-content z-[1] mt-2 rounded-box bg-base-300 shadow-2xl">
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
