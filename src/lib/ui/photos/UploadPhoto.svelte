<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { ToastTypeEnum, type Photo } from '$lib/types';
	import { getToastState } from '$states/toast.svelte';
	import * as m from '$lib/paraglide/messages.js';

	const { onPhotoUploaded } = $props<{ onPhotoUploaded?: (photo: Photo) => void }>();

	let file: File | null = $state(null);
	let description: string = $state('');
	let alt: string = $state('');
	let author: string = $state('Juan Manuel Antonellini');
	let progress = $state(0);
	const toastState = getToastState();

	async function uploadFile(event: Event) {
		event.preventDefault();
		if (!file) return;

		const urlResponse = await fetch('/api/photos/url?name=' + file.name);
		const { preSignedUrl, permanentUrl } = await urlResponse.json();

		const xhr = new XMLHttpRequest();
		xhr.upload.onprogress = (event) => {
			if (event.lengthComputable) {
				const percentComplete = Math.round((event.loaded / event.total) * 100);
				console.log(`Uploading: ${percentComplete}%`);
				progress = percentComplete;
			}
		};

		xhr.onerror = () => {
			return new Response(JSON.stringify({ error: 'Upload failed' }), {
				status: 500,
				headers: { 'Content-Type': 'application/json' }
			});
		};

		// Perform upload
		xhr.open('PUT', preSignedUrl, true);
		xhr.setRequestHeader('Content-Type', file.type);
		xhr.send(file);

		xhr.onload = async () => {
			if (xhr.status === 200) {
				// Store metadata in the database after upload
				const metadataResponse = await fetch('/api/photos', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						url: permanentUrl,
						description,
						alt,
						author
					})
				});

				if (metadataResponse.ok) {
					console.log('Metadata stored successfully');
					if (onPhotoUploaded) {
						const newPhoto = await metadataResponse.json().then((r) => {
							console.log('RESPONSE', r);
							console.log('Photo uploaded', r.photo);
							
							onPhotoUploaded(r.photo);
						});
					}
					toastState.add(`${m.photo_uploaded()}! 🥳`, ToastTypeEnum.Success);
				} else {
					console.error('Error storing metadata', await metadataResponse.text());
				}
			} else {
				console.error('Error uploading file', xhr.statusText);
			}
		};
	}
</script>

<form class="flex w-full flex-col items-center gap-2 p-4 lg:gap-4">
	<input
		placeholder="Photo file"
		type="file"
		class="file-input file-input-bordered w-full"
		oninput={(event) => {
			const target = event.target as HTMLInputElement;
			if (target && target.files) {
				file = target.files[0];
			}
		}}
	/>
	<input
		class="input input-bordered w-full"
		placeholder="Description"
		required
		type="text"
		bind:value={description}
	/>
	<input
		class="input input-bordered w-full"
		placeholder="Alt text"
		required
		type="text"
		bind:value={alt}
	/>
	<input
		class="input input-bordered w-full"
		placeholder="Author"
		required
		type="text"
		bind:value={author}
	/>
	<progress
		class="progress progress-primary invisible w-full"
		class:show={progress > 0}
		value={progress}
		max="100"
	></progress>
	<button class="btn btn-primary btn-md" type="submit" onsubmit={uploadFile} onclick={uploadFile}
		>Upload</button
	>
</form>

<style lang="postcss">
	.show {
		@apply visible;
	}
</style>
