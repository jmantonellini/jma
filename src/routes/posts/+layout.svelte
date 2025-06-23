<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import type { Post } from '@prisma/client';

	import { m } from '$lib/paraglide/messages';

	const pathname = $derived(page.url.pathname);

	let { data, children } = $props();

	const orderedPosts = data?.posts.sort(
		(a: Post, b: Post) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
	);
</script>

<div class="lg:mx-[5vw] lg:grid lg:grid-cols-[auto_1fr] lg:gap-8">
	<aside class="top-24 hidden h-fit w-80 rounded-lg bg-base-200 p-2 lg:sticky lg:block lg:p-4">
		<h2 class="">{m.recent_posts()}</h2>
		<div class="divider divider-secondary"></div>
		<ul class="menu min-h-[40vh] text-base-content">
			{#each orderedPosts as { slug, title }}
				<li>
					<a
						href="/posts/{slug}"
						onclick={(event) => {
							event.preventDefault();
							const current = pathname;
							const target = `/posts/${slug}`;
							if (current !== target) {
								goto(target);
							}
						}}>{title}</a
					>
				</li>
			{/each}
		</ul>
	</aside>
	{@render children()}
</div>
