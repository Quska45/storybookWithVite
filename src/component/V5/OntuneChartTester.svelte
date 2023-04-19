<script lang="ts">
    import { onMount } from "svelte";
    import OntuneChart from "./OntuneChart.svelte";
    import { TestDataMaker } from "./OntuneChart/OntuneChartConst";

    const labels = TestDataMaker.getTerm();
    const datasets = TestDataMaker.getHost( 1, 0 );
    
    const labels2 = TestDataMaker.getTerm();
    const datasets2 = TestDataMaker.getHost( 1, 0 );

    onMount(() => {
    });
</script>

<div id="container" class="tester">
    <div id="titleContainer" class="tester">
        <div id="title"></div>
    </div>
    <OntuneChart
        uuid = {'123'}
        labels = {labels}
        datasets = {datasets}
        componentWidth = {700}
        componentHeight = {400}
    ></OntuneChart>

    <OntuneChart
        uuid = {'345'}
        labels = {labels2}
        datasets = {datasets2}
        componentWidth = {700}
        componentHeight = {400}
    ></OntuneChart>
</div>

<style>
    .tester {
        border: 1px solid black;
    }
    #container {
        width: 800px;
        height: 550px;
    }
    #titleContainer {
        height: 50px;
    }
 </style>
