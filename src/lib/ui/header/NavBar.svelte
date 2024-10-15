<script lang="ts">
import * as m from '$lib/paraglide/messages.js';

import LanguageSelector from './LanguageSelector.svelte';
import NavLink from './NavLink.svelte';
import ThemeController from './ThemeController.svelte';
import MenuIcon from '$lib/icons/MenuIcon.svelte';
import UserMenu from './UserMenu.svelte';

let scrollY: number;

$: fixed = scrollY > 0;

const links = [
	{ href: '/', label: m.home },
	{ href: '/posts', label: m.posts },
	{ href: '/travel', label: m.travel }
];
</script>

<svelte:window bind:scrollY={scrollY} />

<header
	class={`box-border grid grid-cols-[auto_1fr] bg-base-100/80 lg:grid-cols-3 lg:px-4 &${fixed && ' sticky top-4 shadow-lg backdrop-blur-sm'}`}
>
	<div class="dropdown lg:hidden">
		<div tabindex="0" role="button" class="btn btn-ghost">
			<MenuIcon />
		</div>
		<ul
			class="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 text-lg shadow"
		>
			{#each links as { href, label }}
				<NavLink href={href} label={label()} />
			{/each}
		</ul>
	</div>
	<ul
		class="menu menu-horizontal hidden w-full items-center justify-center gap-2 text-lg lg:col-start-2 lg:flex"
	>
		{#each links as { href, label }}
			<NavLink href={href} label={label()} />
		{/each}
	</ul>
	<div class="flex w-full items-center justify-end gap-1 lg:col-start-3 lg:gap-3">
		<UserMenu />
		<LanguageSelector />
		<ThemeController />
	</div>
</header>

<style lang="postcss">
header {
	border-radius: 1rem;
	z-index: 20;
	transition: all 0.3s ease;
}
</style>
