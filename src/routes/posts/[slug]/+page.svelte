<script lang="ts">
	import { localizeHref } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages';
	import { formatDate } from '$lib';

	let { data } = $props();
	const { user, post } = data;

	console.log('POST', post);

	const translation = post?.translations[0];

	console.log('TRANSLATION', translation);

	let showEdit = $state(false);
</script>

<svelte:head>
	<title>{translation?.title ?? 'Post'}</title>
</svelte:head>

<main class="grid grid-rows-[auto_1fr] gap-2 lg:gap-4">
	<hgroup>
		{#if post?.proxyUrl}
			<img src={post?.proxyUrl} alt={translation?.title} class="w-full" />
		{/if}
		<h1
			class="text-secondary"
			onmouseenter={() => (showEdit = true)}
			onmouseleave={() => (showEdit = false)}
		>
			{#if user?.id === post?.authorId}
				<a
					title={m.edit()}
					href={localizeHref(`/posts/editor/${post.slug}`)}
					class={`transition-opacity ${!showEdit && 'lg:opacity-50'}`}>🖋️</a
				>
			{/if}
			{translation?.title ?? 'Untitled'}
		</h1>
		<h4 class="text-accent">
			{translation?.updatedAt ? formatDate(translation.updatedAt) : 'Unknown date'}
		</h4>
	</hgroup>
	<article class="prose prose-slate font-serif">
		{#if post}
			<p>{@html translation?.content}</p>
		{:else}
			<p>Content not available.</p>
		{/if}
	</article>
</main>
