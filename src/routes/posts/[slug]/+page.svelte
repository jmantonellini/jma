<script lang="ts">
	import { getLocale, localizeHref } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages';

	let { data } = $props();
	const { user, post } = data;

	function formatDate(date: Date) {
		return new Intl.DateTimeFormat(getLocale(), {
			dateStyle: 'long'
		}).format(date);
	}

	let showEdit = $state(false);
</script>

<svelte:head>
	<title>{post?.title ?? 'Post'}</title>
</svelte:head>

<main class="grid grid-rows-[auto_1fr] gap-2 lg:gap-4">
	<hgroup>
		<img src={post?.coverImage} alt={post?.title} class="w-full" />
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
			{post?.title ?? 'Untitled'}
		</h1>
		<h4 class="text-accent">
			{post?.createdAt ? formatDate(post.createdAt) : 'Unknown date'}
		</h4>
	</hgroup>
	<article class="prose prose-slate font-serif">
		{#if post}
			<p>{@html post.postContent}</p>
		{:else}
			<p>Content not available.</p>
		{/if}
	</article>
</main>
