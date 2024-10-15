<script>
	import { page } from '$app/stores';
	import { error } from '@sveltejs/kit';
</script>

<h1>Yikes</h1>

<p>Something went wrong!</p>

<pre>
  {JSON.stringify($page.error?.message, null, 2)}
</pre>
