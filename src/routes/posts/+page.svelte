<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import { applyAction } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/state';
	import type { PageProps } from './$types';

	import { m } from '$lib/paraglide/messages';
	import Confirmation from '$lib/ui/modals/Confirmation.svelte';
	import { getToastState } from '$states/toast.svelte';
	import { ToastTypeEnum } from '$lib/types';
	import { isAdmin } from '$lib';

	let { data }: PageProps = $props();

	let dialog = $state<HTMLDialogElement | null>(null);
	let deleteId = $state(0);
	const pathname = $derived(page.url.pathname);

	const toastState = getToastState();

	const posts = $derived(data.posts);
	const deletePost: SubmitFunction = () => {
		return async ({ result }) => {
			invalidateAll();
			toastState.add(`${m.post_deleted()}! 👋🏼`, ToastTypeEnum.Success);
			await applyAction(result);
		};
	};
</script>

<svelte:head>
	<title>{m.posts()}</title>
</svelte:head>

<main class="w-full">
	<ul class="flex flex-col items-center gap-3 lg:items-start">
		{#each posts as post}
			<li class="flex flex-col gap-2">
				<div class="card bg-base-100 shadow-xl lg:card-side">
					<figure>
						<img
							class="aspect-square w-full lg:w-[20rem]"
							src={post.proxyUrl}
							alt={post.description}
						/>
					</figure>
					<div class="card-body">
						<div class="flex items-center gap-2">
							<h3 class="font-semibold">{post.title}</h3>
							{#if isAdmin(page.data?.user?.role)}
								<button
									class="btn btn-ghost"
									onclick={() => {
										dialog?.showModal();
										deleteId = post.id;
									}}>🗑️</button
								>
							{/if}
						</div>
						<p>{post.description}</p>
						<div class="card-actions justify-end">
							<a
								href={`/posts/${post.slug}`}
								onclick={(event) => {
									event.preventDefault();
									if (pathname !== `/posts/${post.slug}`) goto(`/posts/${post.slug}`);
								}}
								class="btn btn-primary">{m.read_post()}</a
							>
						</div>
					</div>
				</div>
			</li>
		{/each}
	</ul>

	<Confirmation id={deleteId} enhanceFunction={deletePost} action={'?/deletePost'} bind:dialog>
		{#snippet title()}
			<span>{m.are_you_sure()}</span>
		{/snippet}
		{#snippet description()}
			<span>{m.delete_description()} 🥺</span>
		{/snippet}
		{#snippet confirm()}
			<span>{m.delete_button()}</span>
		{/snippet}
	</Confirmation>
</main>
