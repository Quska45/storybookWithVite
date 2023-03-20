<script lang="ts">
    import type { ChartConfiguration, ChartData, ChartOptions, ChartTypeRegistry } from "chart.js";
    import { onMount } from "svelte";
    import { OntuneChart } from "./OntuneChart/OntuneChart";
    import { DefaultValue } from "./OntuneChart/DefaultValue";

    // props
    export let width: number = DefaultValue.COMPONENT_WIDTH;
    export let height: number = DefaultValue.COMPONENT_HEIGHT;
    export let type: keyof ChartTypeRegistry = 'line';
    export let data: ChartData;
    export let options: ChartOptions;

    let chartCanvas: HTMLCanvasElement;
    let config: ChartConfiguration;
    let ontuneChart: OntuneChart;

    onMount(() => {
        // set canvas full size
        chartCanvas.style.width = '100%';
        chartCanvas.style.height = '100%';

        // set chartjs options
        options = {
            responsive: true,
            maintainAspectRatio: false
        }

        // set chartjs config
        config = {
            type: type,
            data: data,
            // options: options
        }

        // make chartjs main instance
        ontuneChart = new OntuneChart( chartCanvas, config );
    });
</script>

<div class="ontune_chart_component" style="width: {width}px; height: {height}px">
    <div class="ontune_chart_title_container">

    </div>
    <div class="ontune_chart_container">
        <div class="ontune_chart_body">
            <canvas bind:this={chartCanvas} id="ontuneChart"></canvas>
        </div>
        <div class="ontune_chart_legend_container">

        </div>
    </div>
</div>

<style>
    div {
        border: 1px solid black;
        margin: 0;
        padding: 0;
    }

    canvas {
        border: 1px solid red;
    }
    
    .ontune_chart_component {
        display: flex;
        flex-direction: column;
    }

    .ontune_chart_title_container {
        width: calc(100%);
        height: 20%;
    }
    
    .ontune_chart_container {
        display: flex;
        flex-direction: row;
        width: calc(100%);
        height: 80%;
    }

    .ontune_chart_body{
        /* display: flex; */
        width: calc(70%);
        height: 100%;
    }

    .ontune_chart_legend_container {
        /* display: flex; */
        width: calc(30%);
        height: 100;
    }
</style>
