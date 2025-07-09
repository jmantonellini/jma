<script lang="ts">
	import { onMount } from 'svelte';
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
	import Socials from '$lib/ui/socials/Socials.svelte';
	import Pricing from '$lib/ui/lab/Pricing.svelte';
	import Avatar from '$lib/ui/custom/Avatar.svelte';

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

<div class="flex flex-col self-center space-y-6 lg:space-y-10 items-center lg:max-w-[80%] w-full">
	<h1 class="lg:mt-18 mt-10">Works & Projects</h1>
	<Avatar />
	<h2>{m.hi()} 👋🏼</h2>
	{#if visible}
		<div class="max-w-4xl lg:columns-2 gap-4 lg:gap-8 text-center lg:text-justify relative" in:fade={{ duration }}>
			{@html m.lab_introduction()}
		</div>
		<Socials />
	{/if}
	<div class="text-center max-w-4xl mx-auto">
		<h2>Web Development Packages</h2>
		<p>Flexible plans to build, launch, and maintain your professional online presence.</p>
	</div>
	<Pricing />

	<div class="flex flex-col w-full items-center gap-8 pb-10">
		{#each projects as project, i}
			<div use:reveal={{ delay: i * 150 }}>
				<ProjectCard {...project} />
			</div>
		{/each}
	</div>
</div>
