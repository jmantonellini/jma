<script lang="ts">
import { page } from '$app/stores';
import * as m from '$lib/paraglide/messages.js';
</script>

{#if $page.data.user}
	{m.greeting()}!
{/if}
