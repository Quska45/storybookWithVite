<script lang="ts">
    import { Layout } from "flowbite-svelte";
    import "flowbite/dist/flowbite.css";
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox } from 'flowbite-svelte'
    import type { TCell } from "./TS/FlowBiteSvelteTable";

    export let tableWidth;
    export let tableHeight;
    export let styleStr;
    export let headers: TCell[];
    export let bodys: [TCell[]];

</script>

<Table hoverable={true} divClass='{tableWidth} {tableHeight} overflow-x-auto overflow-y-auto'>
  <TableHead theadClass='w-1 text-xs px-1'>
    {#each headers as header}
      <TableHeadCell style={styleStr}>
        {#if header.isChecked}
          <Checkbox />
        {:else}
          {header.value}
        {/if}
      </TableHeadCell>
    {/each}
  </TableHead>

  <TableBody>
    {#each bodys as body}
      <TableBodyRow>
        {#each body as item}
          <TableBodyCell style={styleStr}>
            {#if item.isChecked}
              <Checkbox />
            {:else}
              {item.value}
            {/if}
          </TableBodyCell>
        {/each}
      </TableBodyRow>
    {/each}
  </TableBody>
</Table>