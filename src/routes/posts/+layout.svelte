<script lang="ts">
import type { LayoutData } from './$types';
import * as m from '$lib/paraglide/messages';
import type { Post } from '@prisma/client';

export let data: LayoutData;
const orderedPosts = data?.posts.sort(
	(a: Post, b: Post) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
);
</script>

<div class="lg:mx-[10vw] lg:grid lg:grid-cols-[auto_1fr] lg:gap-8">
	<aside class="top-24 hidden h-fit w-80 rounded-lg bg-base-200 p-2 lg:sticky lg:block lg:p-4">
		<h2 class="">{m.recent_posts()}</h2>
		<div class="divider divider-secondary" />
		<ul class="menu min-h-[40vh] text-base-content">
			{#each orderedPosts as { slug, title }}
				<li><a href="/posts/{slug}">{title}</a></li>
			{/each}
		</ul>
	</aside>
	<slot />
</div>
