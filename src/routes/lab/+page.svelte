<script lang="ts">
	import { fade } from 'svelte/transition';
	import { reveal } from '$lib/actions/reveal';

	import ProjectCard from '$lib/ui/lab/ProjectCard.svelte';
	import { m } from '$lib/paraglide/messages';
	import Serena from './SERENA.png';
	import Viva from './VIVA.png';
	import Sumaj from './SUMAJ.png';
	import SerenaGif from './SERENA-GIF.gif';
	import SumajGif from './SUMAJ-GIF.gif';
	import VivaGif from './VIVA-GIF.gif';
	import SideFiller from '$lib/ui/custom/SideFiller.svelte';
	import Socials from '$lib/ui/socials/Socials.svelte';
	import { onMount } from 'svelte';

	const projects = [
		{
			title: 'Serena',
			description: m.serena_description(),
			siteUrl: 'https://serenahealing.com',
			image: Serena,
			gif: SerenaGif
		},
		{
			title: 'VIVA',
			description: m.viva_description(),
			siteUrl: 'https://viva-realestate.com',
			image: Viva,
			gif: VivaGif
		},
		{
			title: 'Sumaj',
			description: m.sumaj_description(),
			siteUrl: 'https://sumajhoteles.com',
			image: Sumaj,
			gif: SumajGif
		}
	];

	let visible = $state(false);
	const duration = 600;

	onMount(() => {
		setTimeout(() => {
			visible = true;
		}, duration);
	});
</script>

<div class="flex flex-col items-center w-full gap-8 lg:gap-16">
	<div class="flex flex-col w-full lg:max-w-[80%] items-center gap-8 lg:gap-16 text-center">
		<h1 class="text-3xl">Works & Projects</h1>

		<div class="flex min-h-[50vh] w-full">
			{#if visible}
				<SideFiller side="left" />
				<div class="flex flex-col gap-4 lg:gap-8 relative" in:fade={{ duration }}>
					{@html m.lab_introduction()}
					<Socials />
				</div>
				<SideFiller side="right" />
			{/if}
		</div>

		<div class="flex flex-col w-full items-center gap-4 pb-10">
			{#each projects as project, i}
				<div use:reveal={{ delay: i * 150 }}>
					<ProjectCard {...project} />
				</div>
			{/each}
		</div>
	</div>
</div>
