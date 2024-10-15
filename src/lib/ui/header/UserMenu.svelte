<script lang="ts">
import { applyAction, enhance } from '$app/forms';
import { invalidateAll } from '$app/navigation';
import { page } from '$app/stores';

import * as m from '$lib/paraglide/messages';
</script>

<div class="dropdown h-fit">
	<button tabindex="0" type="button" class="btn-sm lg:btn" aria-expanded="false"> 👤 </button>
	<ul class="dropdown-content z-[1] mt-2 rounded-box bg-base-300 shadow-2xl">
		{#if $page.data.user}
			<li>
				<a class="btn btn-ghost w-full whitespace-nowrap" href="/admin">Admin 🦸🏻‍♂️</a>
			</li>
			<li>
				<form
					action="/logout"
					method="POST"
					use:enhance={() => {
						return async ({result}) => {
							invalidateAll();
							await applyAction(result);
						}
					}}
				>
					<button class="btn btn-ghost whitespace-nowrap" title="Log out" type="submit"
						>{m.logout()} 👋🏼</button
					>
				</form>
			</li>
		{:else}
			<li>
				<a class="btn btn-ghost w-full whitespace-nowrap" href="/login"> {m.login()}</a>
			</li>
			<li>
				<a class="btn btn-ghost w-full whitespace-nowrap" href="/register"> {m.register()}</a>
			</li>
		{/if}
	</ul>
</div>
