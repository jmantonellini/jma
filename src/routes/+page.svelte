<script lang="ts">
import { page } from '$app/stores';
import * as m from '$lib/paraglide/messages.js';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

{#if $page.data.user}
	{m.greeting()}!
{/if}
