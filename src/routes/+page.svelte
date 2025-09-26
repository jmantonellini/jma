<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import CanvasPortal from '$lib/ui/3d/CanvasPortal.svelte';
	import Scene from '$lib/ui/3d/Scene.svelte';
	import { Sky } from '@threlte/extras';
</script>

<svelte:head>
	<title>Welcome</title>
</svelte:head>

<div class="flex flex-col items-center h-full justify-center gap-4 lg:gap-8">
	<h1>
		{m.hi()}
	</h1>
	<div class="w-full h-full">
		<CanvasPortal>
			<Sky elevation={8} />
			<Scene />
		</CanvasPortal>
	</div>
</div>
