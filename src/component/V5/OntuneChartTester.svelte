<script lang="ts">
    import { onMount } from "svelte";
    import OntuneChart from "./OntuneChart.svelte";
    import { TestDataMaker } from "./OntuneChart/OntuneChartConst";
    import type { TChartCategory } from "./OntuneChart/OntuneChartType";

    const chartCatetories: TChartCategory[] = [ { id: 'CPU', name: 'CPU' }, { id: 'Memory', name: 'Memory' } ];
    const labels = TestDataMaker.getTerm();
    const datasets = TestDataMaker.getHost( 1, 0 );
    onMount(() => {
    });
</script>

<div>
    <OntuneChart
        chartCatetories = {chartCatetories}
        labels = {labels}
        datasets = {datasets}
    ></OntuneChart>
</div>

<style>
 </style>
