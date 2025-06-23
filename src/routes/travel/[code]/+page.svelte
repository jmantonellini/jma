<script lang="ts">
	import { capitalize, formatDate } from '$lib';
	import { m } from '$lib/paraglide/messages';

	let { data } = $props<{ slug: string }>();

	const modules = import.meta.glob('/src/countries/**/*.md', { eager: true });
	const mod = modules[`/src/countries/${data.slug.split('-')[0]}/${data.slug}.md`] as any;

	const Post = $derived(mod.default);
	const metadata = mod.metadata;
</script>

<svelte:head>
	<title>{metadata.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={metadata.title} />
</svelte:head>

<article class="flex flex-col gap-4">
	<hgroup>
		<h1>{metadata.title}</h1>
		<p class="opacity-50">{m.published_at()} {formatDate(metadata.date)}</p>
	</hgroup>

	<div class="flex items-center gap-2">
		{#each metadata.categories as category}
			<a class="badge badge-secondary" href={`/category/${category}`}>{capitalize(category)}</a>
		{/each}
	</div>

	<div class="prose">
		<Post />
	</div>
</article>
