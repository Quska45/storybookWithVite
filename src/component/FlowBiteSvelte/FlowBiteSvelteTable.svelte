<script lang="ts">
    import { Layout } from "flowbite-svelte";
    import "flowbite/dist/flowbite.css";
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox } from 'flowbite-svelte'
    import type { TCell } from "./TS/FlowBiteSvelteTable";
    import type { TOntuneData } from "./TS/FlowBiteSvelteLineChart/data/FlowBiteSvelteLineChartData";

    export let tableWidth;
    export let tableHeight;
    export let styleStr: string;
    export let headers: TCell[];
    export let bodys: TOntuneData[];
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
    {#each bodys as body, i}
      <TableBodyRow>
          <TableBodyCell style={styleStr}>
            <Checkbox />
          </TableBodyCell>
          <TableBodyCell style={styleStr}>
            {body.pcName}
          </TableBodyCell>
          <TableBodyCell style={styleStr}>
            {body.value}
          </TableBodyCell>
          <TableBodyCell style={styleStr}>
            {body.valueAvg}
          </TableBodyCell>
          <TableBodyCell style={styleStr}>
            {body.valueAvg}
          </TableBodyCell>
          <TableBodyCell style={styleStr}>
            {body.maxValue}
          </TableBodyCell>
          <TableBodyCell style={styleStr}>
            {body.maxDate}
          </TableBodyCell>
      </TableBodyRow>
    {/each}
  </TableBody>
</Table>