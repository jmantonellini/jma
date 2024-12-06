<script lang="ts">
import { capitalize, formatDate } from '$lib';
import * as m from '$lib/paraglide/messages';

let { data } = $props();
const title = data.meta?.title;
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={title} />
</svelte:head>

<article class="flex flex-col gap-4">
	<hgroup>
		<h1>{title}</h1>
		<p class="opacity-50">{m.published_at()} {formatDate(data.meta?.date)}</p>
	</hgroup>

	<div class="flex items-center gap-2">
		{#each data.meta?.categories as category}
			<a class="badge badge-secondary" href={`/category/${category}`}>{capitalize(category)}</a>
		{/each}
	</div>

	<div class="prose">{@html data.content}</div>
</article>
