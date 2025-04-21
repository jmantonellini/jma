<script lang="ts">
	export let src: string;
	export let alt = '';
	export let width = 800;
	export let height = 600;
	export let className = '';
</script>

<img
	{src}
	{alt}
	{width}
	{height}
	class={`transition duration-300 ease-in-out ${className}`}
	loading="lazy"
/>
