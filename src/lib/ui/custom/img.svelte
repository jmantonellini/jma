<script lang="ts">
type Props = {
	src: string;
	alt: string;
};
const { src, alt }: Props = $props();
</script>

<img src={src} alt={alt} loading="lazy" />
