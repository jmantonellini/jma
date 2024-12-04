<script lang="ts">
import { languageTag } from '$lib/paraglide/runtime.js';
import * as m from '$lib/paraglide/messages.js';

let { data, children } = $props();
</script>

<div
	class="lg:mx-[10vw] lg:grid lg:grid-cols-[auto_1fr] lg:gap-8"
>
	<aside class="top-24 hidden h-fit w-80 rounded-lg bg-base-200 p-2 lg:sticky lg:block lg:p-4">
		<h2>{m.other_countries()}</h2>
		<div class="divider divider-secondary"></div>
		<ul class="menu min-h-[40vh] text-base-content">
			{#each data.posts as post}
				<li><a href="/travel/{post.slug}">{post.title}</a></li>
			{/each}
		</ul>
	</aside>
	{@render children()}
</div>
