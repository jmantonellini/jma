<script lang="ts">
import type { SubmitFunction } from '@sveltejs/kit';
import { applyAction } from '$app/forms';
import { invalidateAll } from '$app/navigation';
import * as m from '$lib/paraglide/messages';

import type { PageData } from './$types';
import Confirmation from '$lib/ui/modals/Confirmation.svelte';
import { getToastState } from '$states/toast.svelte';
import { ToastTypeEnum } from '$lib/types';

export let data: PageData;

let dialog: HTMLDialogElement;
let deleteId: number;

const toastState = getToastState();

$: ({ posts } = data);
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
							src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
							alt="Album"
							class="w-40 lg:w-60"
						/>
					</figure>
					<div class="card-body">
						<div class="flex items-center gap-2">
							<h3 class="font-semibold">{post.title}</h3>
							<button
								class="btn btn-ghost"
								on:click={() => {
								dialog.showModal();
								deleteId = post.id;
							}}>🗑️</button
							>
						</div>
						<p>{post.description}</p>
						<div class="card-actions justify-end">
							<a href={`/posts/${post.slug}`} class="btn btn-primary">{m.read_post()}</a>
						</div>
					</div>
				</div>
			</li>
		{/each}
	</ul>

	<Confirmation
		id={deleteId}
		enhanceFunction={deletePost}
		action={"?/deletePost"}
		bind:dialog={dialog}
	>
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
