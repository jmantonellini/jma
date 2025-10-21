<script lang="ts">
	import { fileProxy, superForm } from 'sveltekit-superforms';

	import { goto } from '$app/navigation';
	import { m } from '$lib/paraglide/messages';

	import { getToastState } from '$states/toast.svelte';
	import { localizeHref } from '$lib/paraglide/runtime';
	import TextEditor from '$lib/ui/post/editor/TextEditor.svelte';

	let { data } = $props();

	const { form, errors, constraints, message, enhance } = superForm(data.form);
	const countries = data.countries;

	const file = fileProxy(form, 'coverImage');

	let loading = $state(false);
	let previewUrl: string | null = $state(null);

	$effect(() => {
		if ($file?.length) {
			previewUrl = URL.createObjectURL($file[0]);
		} else if (typeof $form.coverImage === 'string') {
			previewUrl = ($form.proxyUrl as string) || $form.coverImage;
		}
	});

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
				<label class="label" for="title" id="title">{m.title()}</label>
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
				<label class="label" for="countryCode" id="countryCode">{m.country()}</label>
				<select
					name="countryCode"
					class="select select-primary"
					bind:value={$form.countryCode}
					placeholder="Country"
					{...$constraints.countryCode}
				>
					<option value={null}>None</option>
					{#each countries as country}
						<option value={country.code} selected={country.code === $form.countryCode}>
							{country.flag} {country.name}</option
						>
					{/each}
				</select>
			</fieldset>

			<fieldset class="fieldset">
				<label class="label" for="description" id="description">{m.description()}</label>
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
				<label class="label" for="coverImage" id="coverImage">{m.cover_image()}</label>
				<input
					type="file"
					name="coverImage"
					accept="image/*"
					class="file-input"
					bind:files={$file}
				/>

				{#if previewUrl}
					<img src={previewUrl} alt="Preview" class="mt-2 max-h-48 rounded shadow" />
				{/if}
			</fieldset>

			<fieldset class="fieldset">
				<label class="label" for="published">{m.publish()}</label>
				<input
					name="published"
					type="checkbox"
					bind:checked={$form.published as boolean}
					class="checkbox"
					id="published"
				/>
			</fieldset>

			<fieldset class="fieldset">
				<label class="label" for="translate">{m.translate()}</label>
				<input
					name="translate"
					defaultChecked
					type="checkbox"
					bind:checked={$form.translate as boolean}
					class="checkbox"
					id="translate"
				/>
			</fieldset>

			<fieldset class="fieldset">
				<label class="label" for="content">{m.content()}</label>
				<TextEditor name="content" bind:content={$form.content} />
			</fieldset>

			<div class="flex gap-2 justify-around">
				<button class="btn btn-success">
					{#if $form?.slug}
						{m.save()}
					{:else}
						{m.create_post()}
					{/if}
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
