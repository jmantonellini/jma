<script lang="ts">
	import { m } from '$lib/paraglide/messages';

	let { title, description, siteUrl, image, gif } = $props<{
		title: string;
		description: string;
		siteUrl: string;
		image: string;
		gif?: string;
	}>();

	let gifElement: HTMLImageElement | null = $state(null);

	function handleMouseOver() {
		if (gifElement) {
			gifElement.src = gifElement.src; // reset the GIF's playback
		}
	}

	function handleFocus() {
		// Add a focus handler to accompany the mouseover event
	}
</script>

<div
	class="w-full flex flex-col-reverse glass lg:flex-row rounded-2xl p-4 lg:p-8 gap-4 lg:gap-8"
>
	<div class="flex flex-col w-full lg:w-1/3 items-center justify-center gap-2 lg:gap-4">
		<h2 class="text-xl font-bold text-center">{title}</h2>
		<p class="text-sm text-center">{@html description}</p>
		<a href={siteUrl} target="_blank" class="text-xl">{siteUrl}</a>
	</div>

	<div
		class="w-full lg:w-2/3 relative aspect-video rounded-xl overflow-hidden group"
		role="button"
		onmouseover={handleMouseOver}
		onfocus={handleFocus}
		tabindex="0"
	>
		<img
			{title}
			src={image}
			alt="Captura del sitio {title}"
			class="w-full h-full object-cover transition duration-500 group-hover:hidden"
		/>
		{#if gif}
			<img
				bind:this={gifElement}
				src={gif}
				alt="GIF del sitio {title}"
				class="w-full h-full object-cover hidden transition duration-500 group-hover:block"
			/>
		{/if}
	</div>
</div>
