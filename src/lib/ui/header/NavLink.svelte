<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	let { href, label } = $props<{ href: string; label: string }>();

	const pathname = $derived(page.url.pathname);

	const isActive = (href: string) => {
		if (href === '/') {
			return pathname === href || /^\/[a-z]{2}(\/)?$/.test(pathname);
		} else {
			return pathname.includes(href);
		}
	};
</script>

<li class={`${isActive(href) && 'text-secondary'}`}>
	<a
		{href}
		onclick={(event) => {
			event.preventDefault();
			if (pathname !== href) goto(href);
		}}>{label}</a
	>
</li>
