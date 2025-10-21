<script lang="ts">
	import { capitalize, formatDate } from '$lib';
	import { m } from '$lib/paraglide/messages';
	import { localizeHref } from '$lib/paraglide/runtime.js';

	let { data } = $props();
	const { translation, post, country, user } = data;

	let showEdit = $state(false);

	const flag = country?.flag ?? '🏳️'; // fallback
	const title = translation?.title ?? country?.name;
	const date = post?.createdAt;
	const categories = post?.categories ?? [];
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={title} />
</svelte:head>

<article class="flex flex-col gap-4">
	<hgroup>
		<div class="flex items-center gap-4">
			<div class="text-5xl h-fit">{flag}</div>
			<h1
				class="m-0"
				onmouseenter={() => (showEdit = true)}
				onmouseleave={() => (showEdit = false)}
			>
				{title}
				{#if user?.id === post?.authorId}
					<a
						title={m.edit()}
						href={localizeHref(`/posts/editor/${post.slug}`)}
						class={`text-primary transition-opacity ${!showEdit && 'lg:opacity-50'}`}>🖋️</a
					>
				{/if}
			</h1>
		</div>
		{#if date}
			<p class="opacity-50">{m.published_at()} {formatDate(date)}</p>
		{/if}
	</hgroup>

	<div class="flex items-center whitespace-nowrap text-ellipsis gap-2">
		{#each categories as category}
			<a
				class="badge badge-secondary hover:opacity-70 transition-opacity"
				href={`/category/${category.slug}`}>{capitalize(category.name)}</a
			>
		{/each}
	</div>

	<div class="prose-sm md:prose">
		{@html translation?.content}
	</div>
	<div class="max-w-[65ch] p-4 rounded-md bg-secondary text-center text-secondary-content">
		{m.donation_intro()}
		<div class="dropdown dropdown-hover dropdown-top dropdown-center">
			<div tabindex="0" role="button" class="underline cursor-pointer font-semibold">
				{m.supporting()}
			</div>
			<ul class="dropdown-content menu bg-base-300 rounded-md z-1 w-30 p-2 shadow-sm">
				<li>
					<a class="text-primary" target="_blank" href="https://wise.com/pay/me/juanmanuela102"
						>Wise 💚</a
					>
				</li>
				<li>
					<a class="text-primary" target="_blank" href="https://buymeacoffee.com/juanmantonellini"
						>Coffee ☕️</a
					>
				</li>
			</ul>
		</div>

		<br />{m.donations_outro()}
		<br />{m.thank_you()}
	</div>
</article>
