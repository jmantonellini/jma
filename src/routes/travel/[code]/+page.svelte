<script lang="ts">
	import { capitalize, formatDate } from '$lib';
	import { m } from '$lib/paraglide/messages';

	let { data } = $props();
	const { translation, code, lang } = data;

	// comes from translation.post.country
	const country = translation?.post?.country;
	const flag = country?.flag ?? '🏳️'; // fallback
	const title = translation?.title ?? country?.name;
	const description = translation?.description ?? '';
	const date = translation?.post?.createdAt;
	const categories = translation?.post?.categories ?? [];
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={title} />
</svelte:head>

<article class="flex flex-col gap-4">
	<hgroup>
		<div class="flex items-center gap-4">
			<h1 class="m-0">{title}</h1>
			<div class="text-5xl h-fit">{flag}</div>
		</div>
		<p class="opacity-50">{m.published_at()} {formatDate(date)}</p>
	</hgroup>

	<div class="flex items-center whitespace-nowrap text-ellipsis gap-2">
		{#each categories as category}
			<a
				class="badge badge-secondary hover:opacity-70 transition-opacity"
				href={`/category/${category.slug}`}>{capitalize(category.name)}</a
			>
		{/each}
	</div>

	<div class="prose">
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
