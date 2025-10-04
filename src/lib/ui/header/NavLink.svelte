<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { localizeHref } from '$lib/paraglide/runtime';

	let { href, label } = $props<{ href: string; label: string }>();

	const pathname = $derived(page.url.pathname);

	const isActive = (href: string) => {
		if (href === localizeHref('/')) {
			return pathname === href || /^\/[a-z]{2}(\/)?$/.test(pathname);
		} else {
			return pathname.includes(href);
		}
	};
</script>

<li class={`${isActive(href) && 'text-primary'}`}>
	<a class="font-sans" {href}>{label}</a>
</li>
