<script lang="ts">
import { ParaglideJS } from '@inlang/paraglide-sveltekit';
import { i18n } from '$lib/i18n';
import { onNavigate } from '$app/navigation';

import '../app.css';
import Header from '$lib/ui/header/NavBar.svelte';
import Toasts from '$lib/ui/toasts/Toasts.svelte';

export const prerender = true;

onNavigate((navigation) => {
	if (!document.startViewTransition) return;

	return new Promise((resolve) => {
		document.startViewTransition(async () => {
			resolve();
			await navigation.complete;
		});
	});
});
</script>

<ParaglideJS i18n={i18n}>
	<Toasts />
	<div class="box-border grid h-full min-h-[100vh] w-full grid-rows-[auto_1fr_auto]">
		<Header />

		<div class="mt-12">
			<slot />
		</div>
		<footer class="flex h-full items-center justify-center p-4 lg:p-8">
			<p>&copy; Juanma 2024 🌱</p>
		</footer>
	</div>
</ParaglideJS>
