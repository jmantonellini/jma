<script lang="ts">
import type { Photo } from '@prisma/client';
import UploadPhoto from '$lib/ui/photos/UploadPhoto.svelte';
import Modal from '$lib/ui/modals/Modal.svelte';
import Add from '$lib/icons/Add.svelte';
import * as m from '$lib/paraglide/messages.js';

let { data } = $props<{ photos: Photo[] }>();
let dialog: HTMLDialogElement;
const photos = data.photos;
</script>

<div class="flex w-full flex-col items-center px-2 lg:px-4">
	<button
		class="btn btn-ghost fixed bottom-10 left-10 z-10 h-fit w-fit p-2 transition-transform hover:scale-110"
		onclick={() => dialog.showModal()}><Add class="text-secondary" /></button
	>
	<Modal bind:dialog={dialog}>
		{#snippet title()}
			{m.upload_photo()}{/snippet}
		<UploadPhoto />
	</Modal>
	<div class="columns-3">
		{#if photos}
			{#each photos as photo, i}
				<div class="group relative mb-4 w-full overflow-hidden">
					<img src={photo?.url} alt={photo.alt} class="w-full" loading="lazy" />
					<h2
						class="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-base-100 opacity-0 transition-opacity hover:opacity-80"
					>
						<span class="absolute text-white opacity-50">{photo.description}</span>
						<span class="bg-clip-text text-transparent" style="background-image: url({photo.url});"
							>{photo.description}</span
						>
					</h2>
				</div>
			{/each}
		{/if}
	</div>
</div>
