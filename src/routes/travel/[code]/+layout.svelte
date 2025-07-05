<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { m } from '$lib/paraglide/messages.js';

	let { data, children } = $props();
	let pathname = $derived(page.url.pathname);
</script>

<div class="lg:mx-[10vw] lg:grid lg:grid-cols-[auto_1fr] lg:gap-8">
	<aside class="top-32 hidden h-fit w-80 rounded-lg bg-base-200 p-2 lg:sticky lg:block lg:p-4">
		<h2>{m.other_countries()}</h2>
		<div class="divider divider-secondary"></div>
		<ul class="menu min-h-[40vh] gap-2 text-base-content">
			{#each data.posts as post}
				<li>
					<a
						href="/travel/{post.slug}"
						onclick={(event) => {
							event.preventDefault();
							if (pathname !== `/travel/${post.slug}`) goto(`/travel/${post.slug}`);
						}}>{post.title}</a
					>
				</li>
			{/each}
		</ul>
	</aside>
	{#key data.code}
		{@render children()}
	{/key}
</div>
