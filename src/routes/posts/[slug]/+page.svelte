<script lang="ts">
import type { PageData } from './$types';
import { languageTag } from '$lib/paraglide/runtime';
import * as m from '$lib/paraglide/messages';

export let data: PageData;

const { user, post } = data;

function formatDate(date: Date) {
	return new Intl.DateTimeFormat(languageTag(), {
		dateStyle: 'long'
	}).format(date);
}

let showEdit = false;
</script>

<main class="grid grid-rows-[auto_1fr] gap-2 lg:gap-4">
	<hgroup>
		<h1
			class="text-secondary"
			on:mouseenter={() => showEdit = true}
			on:mouseleave={() => showEdit = false}
		>
			{post?.title ?? 'Untitled'}
			{#if user?.id === post?.authorId}
				<a title={m.edit()} href={`/posts/edit/${post.slug}`} class={`transition-opacity ${!showEdit && 'opacity-0'}`}
					>🖋️</a
				>
			{/if}
		</h1>
		<h4 class="text-accent">
			{post?.createdAt ? formatDate(post.createdAt) : 'Unknown date'}
		</h4>
	</hgroup>
	<article class="prose prose-slate font-serif">
		{#if post}
			{@html post.content}
		{:else}
			<p>Content not available.</p>
		{/if}
	</article>
</main>
