<script lang="ts">
  type Props = {
    src: string;
    alt: string;
    description?: string;
  };
  const { src, alt, description }: Props = $props();
  
  </script>
  
  <figure class="flex w-full flex-col gap-2">
    <img class="m-0" src={src} alt={alt} loading="lazy" />
    {#if description}
      <figcaption class="text-sm">{description}</figcaption>
    {/if}
  </figure>
  