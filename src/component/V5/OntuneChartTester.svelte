<script lang="ts">
    import { onMount } from "svelte";
    import OntuneChart from "./OntuneChart.svelte";
    import { TestDataMaker } from "./OntuneChart/OntuneChartConst";

    const labels = TestDataMaker.getTerm();
    const datasets = TestDataMaker.getHost( 1, 0 );
    onMount(() => {
    });
</script>

<div>
    <OntuneChart
        labels = {labels}
        datasets = {datasets}
    ></OntuneChart>
</div>

<style>
 </style>
