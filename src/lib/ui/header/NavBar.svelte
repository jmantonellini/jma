<script lang="ts">
	import LanguageSelector from './LanguageSelector.svelte';
	import NavLink from './NavLink.svelte';
	import ThemeController from './ThemeController.svelte';
	import MenuIcon from '$lib/icons/MenuIcon.svelte';
	import UserMenu from './UserMenu.svelte';
	import { m } from '$lib/paraglide/messages';

	let scrollY: number;

	$: fixed = scrollY > 0;

	const links = [
		{ href: '/', label: m.home() },
		{ href: '/posts', label: m.posts() },
		{ href: '/lab', label: m.laboratory() },
		{ href: '/travel', label: m.travel() },
		{ href: '/volunteering', label: m.volunteering() },
		{ href: '/photos', label: m.photos() }
	];
</script>

<svelte:window bind:scrollY />

<header
	class={`box-border flex justify-around p-2 lg:p-4 lg:justify-center items-center bg-base-100/80 &${fixed && ' sticky top-4 shadow-lg backdrop-blur-sm'}`}
>
	<div class="dropdown lg:hidden">
		<div tabindex="0" role="button" class="btn btn-ghost">
			<MenuIcon />
		</div>
		<ul
			class="menu dropdown-content menu-sm z-[1] mt-3 w-52 flex-nowrap rounded-btn bg-base-100 p-2 text-lg shadow"
		>
			{#each links as { href, label }}
				<NavLink {href} {label} />
			{/each}
		</ul>
	</div>
	<ul
		class="menu menu-horizontal hidden flex-nowrap items-center justify-center gap-4 text-lg lg:col-start-2 lg:flex"
	>
		{#each links as { href, label }}
			<NavLink {href} {label} />
		{/each}
	</ul>
	<div class="flex items-center gap-2 lg:gap-4">
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
		view-transition-name: header;
	}
</style>
