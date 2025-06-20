<script lang="ts">
	import type { PageData } from './$types';

	import PostForm from '$lib/ui/post/PostForm.svelte';

	export let data: PageData;
</script>

<div class="w-full flex flex-col items-center">
	<div class="flex w-full flex-col items-center gap-2 max-w-2xl">
		<h1>{data.post ? 'Edit Post' : 'New Post'}</h1>
		<PostForm post={data.post ?? {}} actionUrl="?" redirectUrl="/posts" />
	</div>
</div>
