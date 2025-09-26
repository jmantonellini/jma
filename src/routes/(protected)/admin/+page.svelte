<script lang="ts">
	import { page } from '$app/state';
	import { isAdmin } from '$lib';
</script>

<h1>Admin</h1>

{#if page.data.user}
	<p>Welcome {page.data.user.name}</p>
{/if}

{#if isAdmin(page.data.user.role)}
	<form action="/logout" method="POST">
		<button type="submit">Log out</button>
	</form>

	<a
		class="btn btn-ghost w-full whitespace-nowrap"
		href={"https://n8n-app.eco-sistema.net"}
		target="_blank">Go to N8N panel</a
	>
{/if}
