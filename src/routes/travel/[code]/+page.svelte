<script lang="ts">
import { capitalize, formatDate } from '$lib';
import * as m from '$lib/paraglide/messages';
import { marked } from 'marked';

let { data } = $props();

</script>

<svelte:head>
	<title>{data.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.title} />
</svelte:head>

<article class="flex flex-col gap-4">
	<hgroup>
		<h1>{data.title}</h1>
		<p class="opacity-50">{m.published_at()} {formatDate(data?.date)}</p>
	</hgroup>

	<div class="flex items-center gap-2">
		{#each data?.categories as category}
			<a class="badge badge-secondary" href={`/category/${category}`}>{capitalize(category)}</a>
		{/each}
	</div>

	<div class="prose">{@html marked(data.content)}</div>
</article>
