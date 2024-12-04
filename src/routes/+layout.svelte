<script lang="ts">
import type { Snippet } from 'svelte';
import { i18n } from '$lib/i18n';
import { ParaglideJS } from '@inlang/paraglide-sveltekit';

import ViewTransition from './navigation.svelte';
import Header from '$lib/ui/header/NavBar.svelte';
import Toasts from '$lib/ui/toasts/Toasts.svelte';
import { setToastState } from '$states/toast.svelte';
import '../app.css';
import { fly } from 'svelte/transition';

let { children, url }: { children: Snippet; url: string } = $props();

setToastState();
</script>

<ParaglideJS i18n={i18n}>
	<ViewTransition />
	<Toasts />
	<div class="box-border font-jost grid h-full min-h-[100vh] w-full grid-rows-[auto_1fr_auto]">
		<Header />

		{#key url}
			<main
				class="mt-8"
				in:fly={{ x: -200, duration: 300, delay: 300 }}
				out:fly={{ x: 200, duration: 300 }}
			>
				{@render children()}
			</main>
		{/key}
		<footer class="flex h-full items-center justify-center p-4 lg:p-8">
			<p>&copy; Juanma 2024 🌱</p>
		</footer>
	</div>
</ParaglideJS>

<style lang="postcss">
@keyframes fade-in {
	from {
		opacity: 0;
	}
}

@keyframes fade-out {
	to {
		opacity: 0;
	}
}

@keyframes slide-from-right {
	from {
		transform: translateX(30px);
	}
}

@keyframes slide-to-left {
	to {
		transform: translateX(-30px);
	}
}

:root::view-transition-old(root) {
	animation:
		90ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
		300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
}

:root::view-transition-new(root) {
	animation:
		210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
		300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
}
</style>
