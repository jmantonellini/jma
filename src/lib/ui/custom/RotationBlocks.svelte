<script lang="ts">
import { sleep } from '$lib';
import Rotate from '$lib/icons/Rotate.svelte';
import type { Snippet } from 'svelte';

type Props = {
	block1: Snippet;
	block2: Snippet;
	block3: Snippet;
	block4: Snippet;
	onSelect: (id: number) => void;
	onExpand: (value: boolean) => void;
};

const { block1, block2, block3, block4, onSelect, onExpand }: Props = $props();

let rotation = $state(0);
let selected = $state(1);
let expanded = $state(0);

async function rotate() {
	if (expanded > 0) {
		retract();
		console.log('SLEEP');

		await sleep(500);
	}
	rotation -= 90;
	selected = (selected % 4) + 1;
	onSelect(selected);
}

function expand() {
	expanded = selected;
	onExpand(true);
	console.log('EXPAND');
}

function retract() {
	expanded = 0;
	onExpand(false);
}

function onClick(event: MouseEvent) {
	if ((event.target as HTMLElement)?.closest('button')?.id === selected.toString()) {
		expand();
	}
}
</script>

<div
	role="presentation"
	class="flex flex-col items-center gap-4"
	onclick={(event) => {
	if (event.target === event.currentTarget) {
		retract();
	}
}}
	onkeydown={(event) => {
		if (event.key === 'Escape') {
			retract();
	}
	}}
>
	<button class="btn btn-circle btn-sm hover:animate-tick-spin" onclick={rotate}
		><Rotate size="1rem" /></button
	>
	<div
		role="presentation"
		class="relative aspect-square h-[40vh] lg:h-[70vh]"
		style="transform: rotate({rotation}deg); transition: transform 0.5s cubic-bezier(0.36,0,0.66,-0.56);"
	>
		{#each [1, 2, 3, 4] as id}
			<button
				id={id.toString()}
				onclickcapture={onClick}
				onkeydown={(event) => {
				if (event.key === 'Enter' || event.key === 'Space') {
					expand();
				}
			}}
				class={`${id === 1 ? 'left-0 top-0' : id === 2 ? 'right-0 top-0 rotate-90' : id === 3 ? 'bottom-0 right-0 rotate-180' : 'bottom-0 left-0 rotate-[270deg]'} block animate-border rounded-2xl border-2 border-transparent transition-colors duration-700 [background:_linear-gradient(45deg,_oklch(var(--b3))_50%,_oklch(var(--b3)))_padding-box;] hover:[background:linear-gradient(45deg,oklch(var(--b3))_50%,oklch(var(--b3)))_padding-box,conic-gradient(from_var(--border-angle),oklch(var(--s))_80%,oklch(var(--a))_86%,oklch(var(--p))_90%,oklch(var(--a))_94%,oklch(var(--s)))_border-box]`}
				class:selected={selected === id}
				class:expanded={expanded === id}
			>
				{#if id === 1}
					{@render block1()}
				{:else if id === 2}
					{@render block2()}
				{:else if id === 3}
					{@render block3()}
				{:else}
					{@render block4()}
				{/if}
			</button>
		{/each}
	</div>
</div>

<style lang="postcss">
@property --border-angle {
	inherits: false;
	initial-value: 0deg;
	syntax: '<angle>';
}
.block {
	position: absolute;
	border-radius: 1rem;
	padding: 1rem;
	text-align: start;
	transition: all 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);
	width: 48%;
	height: 48%;
	display: flex;
	opacity: 0.2;
	filter: blur(0.5rem);
}
.selected {
	box-shadow: 10px 10px 10px 0px rgba(0, 0, 0, 0.1);
	filter: none;
	z-index: 100;
	opacity: 1;
}
.expanded {
	opacity: 1;
	width: 100%;
	height: 100%;
}
</style>
