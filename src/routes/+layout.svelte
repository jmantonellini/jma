<script lang="ts">
	import '../app.css';
	import type { Snippet } from 'svelte';

	import UmamiAnalytics from '$lib/ui/custom/UmamiAnalytics.svelte';
	import Header from '$lib/ui/header/NavBar.svelte';
	import Toasts from '$lib/ui/toasts/Toasts.svelte';
	import { setToastState } from '$states/toast.svelte';
	import Footer from '$lib/ui/footer/Footer.svelte';
	import { Canvas } from '@threlte/core';
	import CanvasPortalTarget from '$lib/ui/3d/CanvasPortalTarget.svelte';

	let { children }: { children: Snippet } = $props();

	setToastState();
</script>

<UmamiAnalytics />

<!-- <div class="absolute top-0 left-0 w-full h-full">
	<Canvas>
		<CanvasPortalTarget />
	</Canvas>
</div> -->

<Toasts />
<div class="box-border min-h-screen min-w-0 w-screen flex flex-col">
	<Header />

	<main class="flex-grow mt-[var(--header-height)] w-full px-4 lg:p-0">
		{@render children()}
	</main>
	<Footer />
</div>
