<script lang="ts">
    import type { ChartConfiguration, ChartData, ChartOptions, ChartTypeRegistry, LayoutPosition, Plugin, TooltipItem } from "chart.js";
    import { onMount } from "svelte";
    import { OntuneChart } from "./OntuneChart/OntuneChart";
    import { DefaultValue, TestDataMaker } from "./OntuneChart/DefaultValue";
    import type { yAxesPosition } from "./OntuneChart/OntuneChartType";
    import { OntuneChartConfig } from "./OntuneChart/OntuneChartConfig";
    import { Chart as ChartJS } from 'chart.js';
    import { externalTooltipHandler } from "./OntuneChart/OntuneChartUtils";
    import { htmlLegendPlugin } from "./OntuneChart/OntuneChartPlugins/htmlLegendPlugin";

    // props
    export let componentWidth: number = DefaultValue.COMPONENT_WIDTH;
    export let componentHeight: number = DefaultValue.COMPONENT_HEIGHT;
    export let type: keyof ChartTypeRegistry = 'line';
    export let showLegend: boolean = false;
    export let legendPosition: LayoutPosition = 'right';
    export let leftYAxesMin: number = 0;
    export let leftYAxesMax: number = 100;
    export let rightYAxesMin: number = -50;
    export let rightYAxesMax: number = 100;
    export let yAxesPosition: yAxesPosition = 'left';
    export let xAxesMin: number;
    export let xAxesMax: number;

    let data: ChartData = { labels: [], datasets: [] };
    let options: ChartOptions = {};
    let plugins: Plugin[] = [];
    let config: ChartConfiguration = { type: null, data: data, options: options, plugins: plugins };

    let chartCanvas: HTMLCanvasElement;
    let ontuneChart: OntuneChart;
    let ontuneChartConfig: OntuneChartConfig;

    onMount(() => {
        ontuneChartConfig = new OntuneChartConfig( config );
        // for sample
        const sampleLabels = TestDataMaker.getTerm();
        const sampleDataset = TestDataMaker.getHost();

        // set canvas full size
        chartCanvas.style.width = DefaultValue.CANVAS_WIDTH;
        chartCanvas.style.height = DefaultValue.CANVAS_HEIGHT;
        
        // set chartjs Data
        data = {
            labels: sampleLabels,
            datasets: sampleDataset
        }
        
        // set chartjs options
        options = {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            scales: {
                x: {
                    // min: xAxesMin,
                    // max: xAxesMax
                    min: sampleLabels.length - 10,
                    max: sampleLabels.length
                },
                y: {
                    type: 'linear',
                    min: leftYAxesMin,
                    max: leftYAxesMax,
                    display: true,
                    position: 'left'
                },
                y1: {
                    type: 'linear',
                    min: rightYAxesMin,
                    max: rightYAxesMax,
                    display: true,
                    position: 'right',
                }
            },
            plugins: {
                htmlLegend: {
                    containerID: 'ontune_chart_legend_container',
                },
                legend: {
                    display: showLegend
                },
                tooltip: {
                    // callbacks: {
                    //     beforeBody( tooltipItems: TooltipItem<keyof ChartTypeRegistry>[] ) {
                    //         let maxValueTooltipItem: TooltipItem<keyof ChartTypeRegistry>;
                            
                    //         tooltipItems.forEach(( item: TooltipItem<keyof ChartTypeRegistry> ) => {
                    //             if( !maxValueTooltipItem ){
                    //                 maxValueTooltipItem = item;
                    //             } else {
                    //                 maxValueTooltipItem.raw < item.raw ? maxValueTooltipItem = item : null;
                    //             }
                    //         });

                    //         let boldValue = "";
                    //         [...maxValueTooltipItem.formattedValue].forEach((char) => {
                    //             if (char in DefaultValue.unicodeBoldNumber) {
                    //             boldValue += DefaultValue.unicodeBoldNumber[char];
                    //             } else {
                    //             boldValue += char;
                    //             }
                    //         });

                    //         maxValueTooltipItem.formattedValue = boldValue;
                    //     }
                    // }
                    // enabled: false,
                    // external: externalTooltipHandler,
                    position: 'average'
                }
            },

        };

        plugins.push(htmlLegendPlugin);

        // set chartjs config
        config = {
            type: type,
            data: data,
            options: options,
            plugins: plugins,
        };

        // make ontuneChart main instance
        ontuneChart = new OntuneChart( chartCanvas, config );
    });
</script>

<div class="ontune_chart_component" style="width: {componentWidth}px; height: {componentHeight}px">
    <div class="ontune_chart_title_container">
        <div class="ontune_chart_title">
            타이틀 : CPU
        </div>
        <div class="ontune_chart_config">
            설정
        </div>
    </div>
    <div class="ontune_chart_container">
        <div class="ontune_chart_body">
            <canvas bind:this={chartCanvas} id="ontuneChart"></canvas>
        </div>
        <div id="ontune_chart_legend_container" class="ontune_chart_legend_container">

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
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 20%;
    }

    .ontune_chart_title {
        width: 100px;
        height: 30px;
        margin-left: 10px;
    }

    .ontune_chart_config {
        width: 50px;
        height: 30px;
        margin-right: 10px;
    }
    
    .ontune_chart_container {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 80%;
    }

    .ontune_chart_body{
        width: 70%;
        /* width: 100%; */
        height: 100%;
    }

    .ontune_chart_legend_container {
        width: 30%;
        height: 100;
        overflow-y: auto;
    }
</style>
