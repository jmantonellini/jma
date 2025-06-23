<script lang="ts">
	import { locales, getLocale, type Locale, setLocale } from '$lib/paraglide/runtime';

	function switchToLanguage(newLanguage: Locale) {
		setLocale(newLanguage);
	}

	const labels = {
		en: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
		es: '🇦🇷',
		pt: '🇧🇷',
		fr: '🇫🇷'
	};
</script>

<div class="dropdown h-fit">
	<button tabindex="0" type="button" class="btn btn-sm lg:btn-md" aria-expanded="false">
		{labels[getLocale()]}
	</button>
	<ul class="dropdown-content z-[1] mt-2 rounded-btn bg-base-300 shadow-2xl">
		{#each locales as langTag}
			{#if langTag !== getLocale()}
				<li>
					<button
						on:click={() => switchToLanguage(langTag)}
						class="btn btn-ghost justify-start"
						name="themed-dropdown"
						disabled={langTag === getLocale()}
					>
						{labels[langTag]}
					</button>
				</li>
			{/if}
		{/each}
	</ul>
</div>
