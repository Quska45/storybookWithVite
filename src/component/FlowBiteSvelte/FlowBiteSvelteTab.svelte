<script lang="ts">
  import { Tabs, TabItem } from 'flowbite-svelte';
  import "flowbite/dist/flowbite.css";
  import type { TTab } from './TS/FlowBiteSvelteTab';

  export let tabs: TTab[];
  export let tabItemStyleStr: string;
</script>

<Tabs defaultClass='' style="underline">
  {#each tabs as tab}
    {#if tab.isOpen}
      <TabItem open defaultClass="h-10 p-2">
        <div slot="title" class="flex items-center gap-2 h-full">
          {tab.title}
        </div>
        <div style={tabItemStyleStr}>
          <slot></slot>
        </div>
      </TabItem>
    {:else}
      <TabItem>
        <div slot="title" class="flex items-center gap-2">
          {tab.title}
        </div>
        <div>
          {tab.title}
        </div>
      </TabItem>
    {/if}
  {/each}
</Tabs>