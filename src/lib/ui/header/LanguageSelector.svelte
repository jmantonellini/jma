<script lang="ts">
import { page } from '$app/stores';
import { i18n } from '$lib/i18n';
import { goto } from '$app/navigation';
import {
	availableLanguageTags,
	languageTag,
	type AvailableLanguageTag
} from '$lib/paraglide/runtime';

$: currentPathWithoutLanguage = i18n.route($page.url.pathname);

function switchToLanguage(newLanguage: AvailableLanguageTag) {
	const localisedPath = i18n.resolveRoute(currentPathWithoutLanguage, newLanguage);
	goto(localisedPath, { invalidateAll: true });
}

const labels = {
	en: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
	es: '🇦🇷',
	pt: '🇧🇷',
	fr: '🇫🇷'
};
</script>

<div class="dropdown h-fit">
	<button tabindex="0" type="button" class="btn-sm lg:btn" aria-expanded="false">
		{labels[languageTag()]}
	</button>
	<ul class="dropdown-content z-[1] mt-2 rounded-btn bg-base-300 shadow-2xl">
		{#each availableLanguageTags as langTag}
			<li>
				<button
					on:click={() => switchToLanguage(langTag)}
					class="btn btn-ghost justify-start"
					name="themed-dropdown"
					disabled={langTag === languageTag()}
				>
					{labels[langTag]}
				</button>
			</li>
		{/each}
	</ul>
</div>
