<script lang="ts">
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
</script>

<div class="flex flex-col lg:max-w-5xl space-y-10 lg:space-y-20 items-center w-full mx-auto">
	<div id="hero" class="flex flex-col items-center space-y-10">
		<h1 class="lg:mt-18 mt-10">{m.hi()} <ch class="text-primary">👋🏼</ch></h1>
		<Avatar />
		<div class="lg:max-w-4xl lg:columns-2 gap-4 lg:gap-8 text-center lg:text-justify relative">
			{@html m.lab_introduction()}
		</div>
		<Socials />
	</div>
	<div id="pricing" class="flex flex-col items-center space-y-10 mb-6 lg:mb-10">
		<h2>Web Development Packages</h2>
		<p>Flexible plans to build, launch, and maintain your professional online presence.</p>
		<Pricing />
	</div>
	<div id="projects" class="flex flex-col space-y-10 items-center mt-8 mb-8 lg:mt-10 lg:mb-10">
		<h2>{m.recent_projects()}</h2>
		<div class="flex flex-col w-full items-center space-y-8">
			{#each projects as project, i}
				<div>
					<ProjectCard {...project} />
				</div>
			{/each}
		</div>
	</div>
</div>
