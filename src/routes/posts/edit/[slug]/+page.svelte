<script lang="ts">
import type { PageData } from './$types';
import { enhance } from '$app/forms';

import * as m from '$lib/paraglide/messages';
import { page } from '$app/state';

export let data: PageData;
const { post } = data;
</script>

<main>
	<form
		class="grid grid-rows-[auto_1fr_auto] gap-2 lg:gap-4"
		action="/posts?/editPost"
		method="post"
		use:enhance
	>
		<label for="title" class="form-control w-full">
			<div class="label">
				<span class="label-text text-secondary">{m.title()}</span>
			</div>
			<input name="title" class="input input-primary" required type="text" value={post?.title} />
		</label>
		<label for="description" class="form-control w-full">
			<div class="label">
				<span class="label-text text-secondary">{m.description()}</span>
			</div>
			<textarea
				name="description"
				class="textarea textarea-primary resize-none leading-5"
				maxlength="150"
				rows="5"
				cols="50"
				required>{post?.description}</textarea
			>
		</label>
		<label for="content" class="form-control w-full">
			<div class="label">
				<span class="label-text text-secondary">{m.content()}</span>
			</div>
			<textarea
				name="content"
				class="textarea textarea-primary resize-none leading-5"
				rows="40"
				cols="50"
				required>{post?.content}</textarea
			>
		</label>
		<input type="hidden" name="id" value={post?.id} />
		<input type="hidden" name="slug" value={page.params.slug} />
		<button type="submit" class="btn btn-primary">{m.save()}</button>
	</form>
</main>
