<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import * as m from '$lib/paraglide/messages';
</script>

<svelte:head>
	<title>Welcome</title>
</svelte:head>

<div
	in:fly={{ y: 200, duration: 1000 }}
	out:fade
	class="flex flex-col items-center h-full justify-center gap-4 lg:gap-8"
>
	<h1>
		{m.hi()}
	</h1>
	<div class="flex flex-col gap-4 lg:gap-8">
		<p class="text-center max-w-[70vw] lg:max-w-[50vw]">Welcome to my virtual shelter.</p>
		<p class="text-center max-w-[70vw] lg:max-w-[50vw]">
			Where you can read about ecological practices.
		</p>
		<p class="text-center max-w-[70vw] lg:max-w-[50vw]">And maybe learn about travelling & volunteering.</p>
		<p class="text-center max-w-[70vw] lg:max-w-[50vw]">I also post some photos from my journey.</p>
		<p class="text-center max-w-[70vw] lg:max-w-[50vw]">I'm happy you are here :)</p>
	</div>
</div>
