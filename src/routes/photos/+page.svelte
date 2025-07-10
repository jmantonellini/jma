<script lang="ts">
	import { tick } from 'svelte';
	import { page } from '$app/state';

	import { isAdmin } from '$lib';
	import type { Photo } from '$lib/types';
	import UploadPhoto from '$lib/ui/photos/UploadPhoto.svelte';
	import Modal from '$lib/ui/modals/Modal.svelte';
	import Add from '$lib/icons/Add.svelte';
	import { m } from '$lib/paraglide/messages.js';
	import ResponsiveImage from '$lib/ui/custom/ResponsiveImage.svelte';

	let { data } = $props();

	let photos: Photo[] = $state(data.photos);
	let nextCursor: number | null = $state(data.nextCursor);

	let isFetching = $state(false);

	let dialog: HTMLDialogElement | undefined = $state(undefined);
	let loadTrigger: HTMLDivElement | null = $state(null);

	async function loadPhotos() {
		if (!nextCursor || isFetching) return;
		isFetching = true;

		try {
			const res = await fetch(`/api/photos?cursor=${nextCursor}`, {
				headers: { 'x-human-verified': 'true' }
			});
			if (!res.ok) throw new Error('Failed to fetch photos');

			const json = await res.json();
			photos.push(...json.photos);
			nextCursor = json.nextCursor;
		} catch (err) {
			console.error('Error loading more photos:', err);
		} finally {
			isFetching = false;
		}
	}

	let observer: IntersectionObserver | null;

	$effect(() => {
		if (!loadTrigger || observer || !nextCursor) return;

		tick().then(() => {
			observer = new IntersectionObserver(
				([entry]) => {
					if (entry.isIntersecting) loadPhotos();
				},
				{ rootMargin: '200px' }
			);
			if (loadTrigger) {
				observer.observe(loadTrigger);
			}
		});

		return () => {
			observer?.disconnect();
			observer = null;
		};
	});

	function handlePhotoUploaded(photo: Photo) {
		photos.unshift(photo);
		dialog?.close();
	}
</script>

<div class="flex w-full flex-col items-center px-2 lg:px-4">
	{#if isAdmin(page.data?.user?.role)}
		<button
			class="btn btn-ghost fixed bottom-10 left-10 z-10 h-fit w-fit p-2 transition-transform hover:scale-110 outline-hidden backdrop-blur-md"
			onclick={() => dialog?.showModal()}
		>
			<Add class="text-secondary" />
		</button>

		<Modal bind:dialog>
			{#snippet title()}
				{m.upload_photo()}
			{/snippet}
			<UploadPhoto onPhotoUploaded={handlePhotoUploaded} />
		</Modal>
	{/if}

	<div class="columns-2 lg:columns-3">
		{#each photos as photo}
			<div class="group mb-4 relative w-full overflow-hidden">
				<ResponsiveImage src={photo?.proxyUrl || ''} alt={photo.alt} />
				<div
					class="absolute inset-0 lg:bg-radial from-black/10 to-black/70 to-80% transition-all duration-600 group-hover:bg-none flex justify-center"
				>
					<p
						class="text-semibold bg-base-100 h-fit text-center p-2 opacity-0 translate-y-0 group-hover:opacity-100 group-hover:translate-y-3 transition-all duration-500"
					>
						{photo.description}
					</p>
				</div>
			</div>
		{/each}
	</div>

	<div bind:this={loadTrigger} class="h-10 w-full flex justify-center items-center">
		{#if isFetching}
			<div class="loading loading-spinner text-secondary"></div>
		{/if}
	</div>
</div>
