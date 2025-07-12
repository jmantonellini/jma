<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { m } from '$lib/paraglide/messages.js';
	import { localizeHref } from '$lib/paraglide/runtime.js';

	let { data, children } = $props();
	let pathname = $derived(page.url.pathname);
</script>

<div
	class="min-h-screen lg:mx-[5vw] mt-4 lg:mt-8 lg:grid lg:grid-cols-[auto_1fr] lg:gap-8 relative"
>
	<aside
		class="top-[var(--header-height)] hidden self-start h-fit w-80 rounded-lg bg-base-300 p-2 lg:sticky lg:block lg:p-4"
	>
		<h3>{m.other_countries()}</h3>
		<div class="divider divider-secondary dark:divider-neutral"></div>
		<ul class="menu min-h-[30vh] gap-2 text-base-content">
			{#each data.posts as post}
				<li>
					<a
						href={localizeHref(`/travel/${post.slug}`)}
						onclick={(event) => {
							event.preventDefault();
							if (pathname !== `/travel/${post.slug}`) goto(localizeHref(`/travel/${post.slug}`));
						}}>{post.title} {post.flag}</a
					>
				</li>
			{/each}
		</ul>
	</aside>
	{#key data.code}
		{@render children()}
	{/key}
</div>
