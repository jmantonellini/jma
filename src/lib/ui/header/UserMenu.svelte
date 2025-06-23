<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { page } from '$app/state';
	import { isAdmin } from '$lib';

	import { m } from '$lib/paraglide/messages';
	import { ToastTypeEnum } from '$lib/types';
	import { getToastState } from '$states/toast.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';

	const toastState = getToastState();

	const logout: SubmitFunction = () => {
		return async ({ result }) => {
			result.status === 200 || result.status === 303
				? toastState.add(`${m.see_you_soon()}  👋🏼`, ToastTypeEnum.Success)
				: toastState.add(`${m.something_wrong()}  😓`, ToastTypeEnum.Error);
			await applyAction(result);
		};
	};
</script>

<div class="dropdown h-fit">
	<button tabindex="0" type="button" class="btn btn-sm lg:btn-md" aria-expanded="false">
		👤
	</button>
	<ul class="dropdown-content z-[1] mt-2 rounded-btn bg-base-300 shadow-2xl">
		{#if page.data.user && isAdmin(page.data.user.role)}
			<li>
				<a class="btn btn-ghost w-full whitespace-nowrap" href="/admin">Admin 🦸🏻‍♂️</a>
			</li>
			<li>
				<a class="btn btn-ghost w-full whitespace-nowrap" href="/posts/editor">Create Post ✍🏼</a>
			</li>
		{/if}
		{#if page.data.user}
			<li>
				<form action="/logout" method="post" use:enhance={logout}>
					<button class="btn btn-ghost w-full whitespace-nowrap" title="Log out" type="submit"
						>{m.logout()}</button
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
