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

<div class="w-fit max-w-xl items-center flex flex-col rounded-2xl p-4 bg-base-200 space-y-4 lg:p-8">
	<h2 class="text-primary">{title}</h2>
	<div
		class="relative aspect-video rounded-xl overflow-hidden group"
		role="button"
		onmouseover={handleMouseOver}
		onfocus={handleFocus}
		tabindex="0"
	>
		<img
			{title}
			src={image}
			alt="Captura del sitio {title}"
			class="w-full lg:w-xl object-contain transition duration-500 group-hover:hidden"
		/>
		{#if gif}
			<img
				bind:this={gifElement}
				src={gif}
				alt="GIF del sitio {title}"
				class="w-full object-contain hidden transition duration-500 group-hover:block"
			/>
		{/if}
	</div>
	<p class="text-sm text-center">{@html description}</p>
	<button
		title="Go to {siteUrl}"
		aria-label="Check website {siteUrl}"
		class="btn btn-secondary"
		onclick={() => window.open(siteUrl, '_blank')}>{m.check_website()}</button
	>
</div>
