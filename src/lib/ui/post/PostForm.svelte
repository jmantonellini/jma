<script lang="ts">
	import { enhance, applyAction } from '$app/forms';
	import { getToastState } from '$states/toast.svelte';
	import { ToastTypeEnum } from '$lib/types';
	import { invalidateAll, goto } from '$app/navigation';
	import { m } from '$lib/paraglide/messages';
	import UploadCoverImage from './UploadCoverImage.svelte';
	import { localizeHref } from '$lib/paraglide/runtime';

	export let post: {
		id?: number;
		title?: string;
		description?: string;
		coverImage?: string;
		content?: string;
		slug?: string;
	} = {};

	export let actionUrl: string;
	export let redirectUrl: string = '/posts';

	let loading = false;
	const toastState = getToastState();

	const formEnhance = () => {
		loading = true;

		return async ({ result, formData }: any) => {
			loading = true;

			await applyAction(result);
			invalidateAll();
			loading = false;

			toastState.add(`${m.post_created()} ✅`, ToastTypeEnum.Success);
		};
	};
</script>

<form
	method="post"
	enctype="multipart/form-data"
	action={actionUrl}
	use:enhance={formEnhance}
	class="flex flex-col w-full gap-4"
>
	<input type="hidden" name="id" value={post.id} />
	<input type="hidden" name="slug" value={post.slug} />

	<label class="form-control">
		<div class="label"><span class="label-text">{m.title()}</span></div>
		<input
			name="title"
			class="input input-primary"
			required
			type="text"
			bind:value={post.title}
			placeholder={m.post_title()}
		/>
	</label>

	<label class="form-control">
		<div class="label"><span class="label-text">{m.description()}</span></div>
		<input
			name="description"
			class="input input-primary"
			required
			type="text"
			bind:value={post.description}
			placeholder="Short summary"
		/>
	</label>

	<label class="form-control">
		<div class="label"><span class="label-text">{m.cover_image()}</span></div>
		<UploadCoverImage name="coverFile" />
	</label>

	<label class="form-control">
		<div class="label"><span class="label-text">{m.content()}</span></div>
		<textarea
			name="content"
			class="textarea textarea-primary min-h-60 resize-none leading-5"
			bind:value={post.content}
			required
		></textarea>
	</label>

	<div class="flex gap-2 justify-around">
		<button type="submit" name="intent" value="save" class="btn btn-success">
			{#if post?.id}
				{m.save()}
			{:else}
				{m.create_post()}
			{/if}
			{#if loading}<span class="loading loading-spinner"></span>{/if}
		</button>
		<button type="submit" name="intent" value="publish" class="btn btn-primary">
			{m.publish()}
			{#if loading}<span class="loading loading-spinner"></span>{/if}
		</button>
		<button type="button" on:click={() => goto(localizeHref(redirectUrl))} class="btn btn-error">
			{m.cancel()}
			{#if loading}<span class="loading loading-spinner"></span>{/if}
		</button>
	</div>
</form>
