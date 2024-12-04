<script lang="ts">
import RotationBlocks from '$lib/ui/custom/RotationBlocks.svelte';
import { onMount } from 'svelte';
import { fade, fly } from 'svelte/transition';
// import me from '$lib/images/me.webp';
import Socials from '$lib/ui/socials/Socials.svelte';

let selected = $state(0);
let expanded = $state(false);
let age = $state(0);

function onSelect(id: number) {
	selected = id;
}

function onExpand(value: boolean) {
	console.log('EXPAND 2');
	console.log('SELECTED', selected);
	expanded = value;
	console.log('EXPANDED', expanded);
}

onMount(() => {
	const birthDate = new Date('1993-10-12');
	const today = new Date();
	const ageDifMs = today.getTime() - birthDate.getTime();
	const ageDate = new Date(ageDifMs);
	age = Math.abs(ageDate.getUTCFullYear() - 1970);
});
</script>

<svelte:head>
	<title>Welcome</title>
</svelte:head>

<RotationBlocks onSelect={onSelect} onExpand={onExpand}>
	{#snippet block1()}
		<div class="text-[15cqw] font-bold leading-none">Hi</div>
	{/snippet}
	{#snippet block2()}
		<div class="relative flex h-full flex-col justify-between leading-none">
			<span class="text-[2cqw] font-bold lg:text-[4cqw]"
				>I'm
				<span
					class={`transition-colors duration-1000 ${selected === 2 && 'animate-text bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent'}`}
				>
					Juanma</span
				>
			</span>
			{#if selected === 2 && expanded}
				<Socials />
				<div class="grid grid-cols-2" out:fade={{duration: 300}}>
					<div in:fly={{ y: 200, duration: 700, delay: 300 }}>
						<enhanced:img
							fetchpriority="high"
							loading="eager"
							src="$lib/images/me.webp"
							class="w-full drop-shadow-glow"
							alt="Me"
						/>
					</div>
					<div class="flex flex-col lg:gap-4">
						<span class="block-text" in:fly={{ x: -100, duration: 700, delay: 300 }}>
							Software Engineer
						</span>
						<span class="block-text self-end" in:fly={{ x: 100, duration: 700, delay: 300 }}>
							{age} years old
						</span>
						<span class="block-text" in:fly={{ x: -100, duration: 700, delay: 300 }}>
							from
							<span
								class="animate-text bg-gradient-to-r from-blue-500 via-white to-blue-500 bg-clip-text text-transparent transition-colors duration-500"
								>Argentina</span
							>
						</span>
						<span class="block-text self-end" in:fly={{ x: 100, duration: 700, delay: 300 }}>
							digital nomad
						</span>
						<span class="block-text" in:fly={{ x: -100, duration: 700, delay: 300 }}>
							🐱 lover
						</span>
					</div>
				</div>
			{/if}
		</div>
	{/snippet}
	{#snippet block3()}
		<span class="text-[1.5cqw] leading-tight font-bold">
			I love traveling and learning about stuff
			Some of my interests are technology 💻, photography 📷 &
			knowledge sharing 📖
		</span>
	{/snippet}
	{#snippet block4()}
		<span class="text-[4cqw] font-bold leading-none lg:text-[2cqw]"></span>
	{/snippet}
</RotationBlocks>

<style lang="postcss">
.block-text {
	@apply text-[1cqw] leading-none lg:text-[2cqw];
}
</style>
