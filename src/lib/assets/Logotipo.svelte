<script lang="ts">
	const { width, height } = $props<{ width: number; height: number }>();
</script>

<a aria-label="Eco Sistema" href="/">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		xml:space="preserve"
		fill-rule="evenodd"
		stroke-linejoin="round"
		stroke-miterlimit="2"
		clip-rule="evenodd"
		{width}
		{height}
		viewBox="0 0 400 400"
		class="text-primary dark:text-white aspect-square"
	>
		<path
			fill="currentColor"
			d="M0 200C0 89.62 89.617 0 200 0h199.995v200c0 110.38-89.61 200-199.995 200H0V200Zm323.495 5.49c-.87-41.02-13.03-73.32-36.47-96.91C263.581 85 234.428 73.2 199.56 73.2c-34.867 0-64.094 12.46-87.68 37.36-23.587 24.91-35.38 54.79-35.38 89.66s11.72 64.68 35.16 89.44c23.44 24.76 53.18 37.14 89.219 37.14 26.077 0 48.492-6.08 67.244-18.24 18.752-12.16 35.012-30.99 48.782-56.48l-30.76-15.82c-20.22 37.8-49.52 56.69-87.903 56.69-22.561 0-41.972-7.98-58.234-23.95-16.262-15.97-25.125-37.14-26.59-63.51h210.077Zm-40.43-32.08H117.813c13.478-43.36 40.727-65.05 81.747-65.05 20.218 0 38.091 5.72 53.62 17.14 15.529 11.43 25.491 27.4 29.885 47.91Z"
		/>
	</svg>
</a>
