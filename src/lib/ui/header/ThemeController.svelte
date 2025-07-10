<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	const themes = {
		light: '🌱',
		dark: '🌙'
	};

	let currentTheme: keyof typeof themes = $state('light');
	let themeIcon = $derived(themes[currentTheme]);

	onMount(() => {
		onMount(() => {
			if (!browser) return;
			const stored = document.cookie.match(/colortheme=(light|dark)/)?.[1];

			const systemPref = window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light';
			const themeToUse = (stored as keyof typeof themes) || systemPref;

			document.documentElement.setAttribute('data-theme', themeToUse);
			currentTheme = themeToUse;
			themeIcon = themes[currentTheme];
		});
	});

	function toggleTheme() {
		currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
		themeIcon = themes[currentTheme];

		document.documentElement.setAttribute('data-theme', currentTheme);
		document.cookie = `colortheme=${currentTheme}; path=/; max-age=${60 * 60 * 24 * 365}`;
	}
</script>

<button type="button" class="btn btn-sm lg:btn-md" onclick={toggleTheme} aria-label="Toggle theme">
	{themeIcon}
</button>
