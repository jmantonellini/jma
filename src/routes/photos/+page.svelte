<script lang="ts">
	import { tick } from 'svelte';
	import UploadPhoto from '$lib/ui/photos/UploadPhoto.svelte';
	import Modal from '$lib/ui/modals/Modal.svelte';
	import Add from '$lib/icons/Add.svelte';
	import * as m from '$lib/paraglide/messages.js';
	import ResponsiveImage from '$lib/ui/custom/ResponsiveImage.svelte';
	import type { Photo } from '$lib/types';

	let { data } = $props<{ photos: Photo[]; nextCursor: string | null }>();

	let loadMoreTrigger: HTMLDivElement;
	let dialog: HTMLDialogElement = $state(null) as HTMLDialogElement | unknown as HTMLDialogElement;

	let photos = $state(data.photos);
	let nextCursor = $state(data.nextCursor);
	let isFetching = $state(false);
	let alreadyLoaded = $state(false);

	let observer: IntersectionObserver | null = null;

	async function startObserver() {
		if (!loadMoreTrigger || observer || !nextCursor) return;
		console.log('Observer started');
		
		await tick();

		observer = new IntersectionObserver(
			async ([entry]) => {
				if (entry.isIntersecting && nextCursor && !isFetching && alreadyLoaded) {
					isFetching = true;
					try {
						console.log('Fetching more photos');
						
						const res = await fetch(`/api/photos?cursor=${nextCursor}`);
						if (!res.ok) throw new Error('Failed to fetch photos');

						const json = await res.json();
						photos.push(...json.photos);
						nextCursor = json.nextCursor;
					} catch (err) {
						console.error('Error cargando más fotos:', err);
					} finally {
						isFetching = false;
					}
				}
			},
			{ rootMargin: '100px' }
		);

		observer.observe(loadMoreTrigger);

		alreadyLoaded = true;
	}

	$effect(() => {
		!observer && startObserver();

		return () => {
			observer?.disconnect();
			observer = null;
		};
	});

	function handlePhotoUploaded(photo: Photo) {
		photos.unshift(photo);
		dialog.close();
	}
</script>

<div class="flex w-full flex-col items-center px-2 lg:px-4">
	<button
		class="btn btn-ghost fixed bottom-10 left-10 z-10 h-fit w-fit p-2 transition-transform hover:scale-110"
		onclick={() => dialog.showModal()}
	>
		<Add class="text-secondary" />
	</button>

	<Modal bind:dialog>
		{#snippet title()}
			{m.upload_photo()}
		{/snippet}
		<UploadPhoto onPhotoUploaded={handlePhotoUploaded} />
	</Modal>

	<div class="columns-3">
		{#each photos as photo}
			<div class="group relative mb-4 w-full overflow-hidden">
				<ResponsiveImage src={photo?.proxyUrl || ''} alt={photo.alt} />
				<h2
					class="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-base-100 opacity-0 transition-opacity hover:opacity-80"
				>
					<span class="absolute text-white opacity-50">{photo.description}</span>
					<span
						class="bg-clip-text text-transparent"
						style="background-image: url({photo.proxyUrl});"
					>
						{photo.description}
					</span>
				</h2>
			</div>
		{/each}
	</div>

	<!-- Trigger para cargar más -->
	<div bind:this={loadMoreTrigger} class="h-10 w-full"></div>
</div>
