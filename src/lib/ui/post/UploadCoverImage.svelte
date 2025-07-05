<script lang="ts">
	export let name: string = 'coverFile';
	export let required: boolean = false;

	let file: File | null = null;
	let previewUrl: string | null = null;

	function handleFile(event: Event) {
		const target = event.target as HTMLInputElement;
		file = target?.files?.[0] ?? null;
		if (file) previewUrl = URL.createObjectURL(file);
	}
</script>

<input
	type="file"
	{name}
	accept="image/*"
	class="file-input file-input-bordered"
	on:change={handleFile}
	{required}
/>

{#if previewUrl}
	<img src={previewUrl} alt="Preview" class="mt-2 max-h-48 rounded-sm shadow" />
{/if}
