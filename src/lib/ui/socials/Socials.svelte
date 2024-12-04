<script lang="ts">
import { fly } from 'svelte/transition';

import GitHub from '$lib/icons/GitHub.svelte';
import Instagram from '$lib/icons/Instagram.svelte';
import LinkedIn from '$lib/icons/LinkedIn.svelte';
import Mail from '$lib/icons/Mail.svelte';
</script>

<div class="flex items-center justify-center gap-2 lg:gap-4">
	<a
		href="https://www.instagram.com/juanma.antonellini/"
		target="_blank"
		class="transition-colors hover:animate-bounce hover:text-[#DD2A7B]"
		in:fly={{y:100, duration: 150, delay: 600}}
	>
		<Instagram />
	</a>
	<a
		href="https://www.github.com/jmantonellini/"
		target="_blank"
		class="transition-colors hover:animate-bounce hover:text-[#02040A]"
		in:fly={{y:100, duration: 150, delay: 700}}
	>
		<GitHub />
	</a>
	<a
		href="https://www.linkedin.com/in/juanma-antonellini/"
		target="_blank"
		class="transition-colors hover:animate-bounce hover:text-[#0E76A8]"
		in:fly={{y:100, duration: 150, delay: 800}}
	>
		<LinkedIn />
	</a>
	<a
		href="mailto:juanmantonellini@gmail.com"
		target="_blank"
		class="transition-colors hover:animate-bounce hover:text-[#ff3636]"
		in:fly={{y:100, duration: 150, delay: 900}}
	>
		<Mail />
	</a>
</div>

<!-- <style lang="postcss">
.social-btn {
	@apply cursor-pointer text-primary transition-colors hover:animate-bounce;
}
</style> -->
