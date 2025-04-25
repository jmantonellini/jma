<script lang="ts">
	let { src, alt } = $props<{ src: string; alt: string }>();
	let loaded = $state(false);
</script>

<img
	{src}
	{alt}
	class={`transition duration-500 ease-in-out ${loaded ? 'blur-0' : 'blur-md'} w-full`}
	loading="lazy"
	onload={() => (loaded = true)}
/>
