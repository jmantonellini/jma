<script lang="ts">
	import '../app.css';
	import type { Snippet } from 'svelte';
	import UmamiAnalytics from '$lib/ui/custom/UmamiAnalytics.svelte';
	import Header from '$lib/ui/header/NavBar.svelte';
	import Toasts from '$lib/ui/toasts/Toasts.svelte';
	import { setToastState } from '$states/toast.svelte';
	import { fly } from 'svelte/transition';
	import Footer from '$lib/ui/footer/Footer.svelte';

	let { children }: { children: Snippet } = $props();

	setToastState();
</script>

<UmamiAnalytics />

<Toasts />
<div class="box-border min-h-screen min-w-0 w-screen flex flex-col">
	<Header />

	<main
		class="flex-grow mt-[var(--header-height)] w-full px-4 lg:p-0"
		in:fly={{ x: -200, duration: 300, delay: 300 }}
		out:fly={{ x: 200, duration: 300 }}
	>
		{@render children()}
	</main>
	<Footer />
</div>

<style lang="postcss">
	@reference "tailwindcss";

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
