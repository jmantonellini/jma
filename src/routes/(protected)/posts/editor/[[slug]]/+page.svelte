<script lang="ts">
	import { fileProxy, superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';

	import { goto } from '$app/navigation';
	import { m } from '$lib/paraglide/messages';

	import { getToastState } from '$states/toast.svelte';
	import { localizeHref } from '$lib/paraglide/runtime';
	import TextEditor from '$lib/ui/post/editor/TextEditor.svelte';
	import { PostSchema } from './zod-schema';

	let { data } = $props();

	const { form, errors, constraints, message, enhance } = superForm(data.form, {
		validators: zod4Client(PostSchema),
		onError({ result }) {
			$message = result.error.message || 'Unknown error';
			console.log('ERROR', result.error.message);
		}
	});

	const file = fileProxy(form, 'coverFile');

	let loading = $state(false);
	let previewUrl: string | null = $state(null);

	const toastState = getToastState();
</script>

<div class="w-full flex flex-col items-center">
	<div class="flex w-full flex-col items-center gap-2 max-w-5xl">
		<h1>{$form.slug ? 'Edit Post' : 'New Post'}</h1>
		{#if $message}<h3>{$message}</h3>{/if}
		<form
			method="POST"
			enctype="multipart/form-data"
			use:enhance
			class="flex flex-col w-full gap-4"
		>
			<input type="hidden" name="id" value={$form.id} />
			<input type="hidden" name="slug" value={$form.slug} />

			<fieldset class="fieldset">
				<label class="label" for="title">{m.title()}</label>
				<input
					name="title"
					class="input input-primary"
					required
					type="text"
					aria-invalid={$errors.title ? 'true' : undefined}
					bind:value={$form.title}
					placeholder={m.post_title()}
					{...$constraints.title}
				/>
			</fieldset>

			<fieldset class="fieldset">
				<label class="label" for="description">{m.description()}</label>
				<input
					name="description"
					class="input input-primary"
					required
					type="text"
					aria-invalid={$errors.description ? 'true' : undefined}
					bind:value={$form.description}
					placeholder="Short summary"
					{...$constraints.description}
				/>
			</fieldset>

			<fieldset class="fieldset">
				<label class="label" for="coverFile">{m.cover_image()}</label>
				<input
					type="file"
					name="coverFile"
					accept="image/*"
					class="file-input"
					bind:files={$file}
				/>

				{#if previewUrl}
					<img src={previewUrl} alt="Preview" class="mt-2 max-h-48 rounded-sm shadow" />
				{/if}
			</fieldset>

			<fieldset class="fieldset">
				<label class="label" for="postContent">{m.content()}</label>
				<TextEditor name="postContent" bind:content={$form.postContent} />
			</fieldset>

			<div class="flex gap-2 justify-around">
				<button type="submit" name="intent" value="save" class="btn btn-success">
					{#if $form?.slug}
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
				<button type="button" onclick={() => goto(localizeHref('/posts'))} class="btn btn-error">
					{m.cancel()}
					{#if loading}<span class="loading loading-spinner"></span>{/if}
				</button>
			</div>
		</form>
	</div>
</div>
