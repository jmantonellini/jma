<script lang="ts">
import { page } from '$app/stores';
import { isAdmin } from '$lib';
</script>

<h1>Admin</h1>

{#if $page.data.user}
	<p>Welcome {$page.data.user.name}</p>
{/if}

{#if isAdmin($page.data.user.role)}
	<form action="/logout" method="POST">
		<button type="submit">Log out</button>
	</form>
{/if}
