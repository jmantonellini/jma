<script lang="ts">
  type Props = {
    src: string;
    alt: string;
    description?: string;
  };
  const { src, alt, description }: Props = $props();
  
  </script>
  
  <div class="flex w-full flex-col gap-2">
    <img class="m-0" src={src} alt={alt} loading="lazy" />
    {#if description}
      <div class="text-sm">{description}</div>
    {/if}
  </div>
  