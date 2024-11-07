<script lang="ts">
export let href;
export let label;
import { page } from '$app/stores';

const isActive = (href: string) => {
	if (href === '/') {
		return $page.url.pathname === href || /^\/[a-z]{2}(\/)?$/.test($page.url.pathname);
	} else {
		return $page.url.pathname.includes(href);
	}
};
</script>

<li class={`${isActive(href) && 'text-secondary'}`}>
	<a href={href}>{label}</a>
</li>
