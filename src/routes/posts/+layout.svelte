<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import type { Post } from '@prisma/client';

	import { m } from '$lib/paraglide/messages';
	import { localizeHref } from '$lib/paraglide/runtime.js';

	const pathname = $derived(page.url.pathname);

	let { data, children } = $props();

	const orderedPosts = data?.posts.sort(
		(a: Post, b: Post) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
	);
</script>

<div class="lg:mx-[5vw] mt-4 lg:mt-8 lg:grid lg:grid-cols-[auto_1fr] lg:gap-8 relative">
	<aside class="top-32 hidden w-80 rounded-lg bg-base-200 p-2 lg:sticky lg:block lg:p-4">
		<h3>{m.recent_posts()}</h3>
		<div class="divider divider-secondary"></div>
		<ul class="menu min-h-[30vh] text-base-content">
			{#each orderedPosts as { slug, title }}
				<li>
					<a
						href={localizeHref(`/posts/${slug}`)}
						onclick={(event) => {
							event.preventDefault();
							const current = pathname;
							const target = localizeHref(`/posts/${slug}`);
							if (current !== target) {
								goto(target);
							}
						}}>{title}</a
					>
				</li>
			{/each}
		</ul>
	</aside>

	{#key pathname}
		{@render children()}
	{/key}
</div>
