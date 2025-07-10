<script lang="ts">
	import LanguageSelector from './LanguageSelector.svelte';
	import NavLink from './NavLink.svelte';
	import ThemeController from './ThemeController.svelte';
	import MenuIcon from '$lib/icons/MenuIcon.svelte';
	import UserMenu from './UserMenu.svelte';
	import { m } from '$lib/paraglide/messages';
	import Logotipo from '$lib/assets/Logotipo.svelte';

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
	class={`w-screen transition-all duration-300 ease-in-out z-20 fixed flex items-center h-[var(--header-height)] justify-around p-2 lg:p-4 bg-base-100/80 &${fixed && 'shadow-lg backdrop-blur-xs'}`}
>
	<Logotipo classes="hidden lg:block" width={50} height={50} />
	<nav class="dropdown lg:hidden">
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
	</nav>

	<nav>
		<ul
			class="menu menu-horizontal hidden flex-nowrap items-center justify-center gap-4 text-lg lg:flex"
		>
			{#each links as { href, label }}
				<NavLink {href} {label} />
			{/each}
		</ul>
	</nav>
	<div class="flex items-center justify-end gap-2 lg:gap-4">
		<UserMenu />
		<LanguageSelector />
		<ThemeController />
	</div>
</header>
