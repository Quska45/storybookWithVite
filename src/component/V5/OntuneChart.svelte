<script lang="ts">
    import type { ChartConfiguration, ChartData, ChartDataset, ChartOptions, ChartTypeRegistry, LayoutPosition, Plugin, TooltipItem } from "chart.js";
    import { onMount } from "svelte";
    import { OntuneChart } from "./OntuneChart/OntuneChart";
    import { DefaultValue, Style, TestDataMaker } from "./OntuneChart/OntuneChartConst";
    import type { TLengendOptions, TYAxesPosition } from "./OntuneChart/OntuneChartType";
    import { OntuneChartConfig } from "./OntuneChart/OntuneChartConfig";
    import { Chart as ChartJS } from 'chart.js';
    import { externalTooltipHandler } from "./OntuneChart/OntuneChartUtils";
    import { htmlLegendPlugin } from "./OntuneChart/OntuneChartPlugins/htmlLegendPlugin";
    import { OntuneLegend } from "./OntuneChart/OntuneLegend";

    // props
    export let componentWidth: number = DefaultValue.COMPONENT_WIDTH;
    export let componentHeight: number = DefaultValue.COMPONENT_HEIGHT;
    export let chartType: keyof ChartTypeRegistry = DefaultValue.CHART_TYPE as keyof ChartTypeRegistry;
    export let showLegend: boolean = DefaultValue.SHOW_LEGEND;
    export let legendPosition: LayoutPosition = DefaultValue.LEGEND_POSITION as LayoutPosition;
    export let leftYAxesMin: number = DefaultValue.LEFT_Y_AXES_MIN;
    export let leftYAxesMax: number = DefaultValue.LEFT_Y_AXES_MAX;
    export let rightYAxesMin: number = DefaultValue.RIGHT_Y_AXES_MIN;
    export let rightYAxesMax: number = DefaultValue.RIGHT_Y_AXES_MAX;
    export let yAxesPosition: TYAxesPosition = DefaultValue.Y_AXES_POSITION as TYAxesPosition;
    export let showLegendValue: boolean = DefaultValue.SHOW_LEGEND_VALUE;
    export let globalLineWidth: number = DefaultValue.GLOBAL_LINE_WIDTH;
    export let labels: unknown[] = [];
    export let datasets: ChartDataset[] = [];

    // data object
    const legendOptions: TLengendOptions = { position: legendPosition, showLegend: showLegend, showLegendValue: showLegendValue };
    let data: ChartData = { labels: labels, datasets: datasets };
    let options: ChartOptions = {};
    let config: ChartConfiguration;
    let plugins: Plugin[] = [];
    
    // dom element
    let chartCanvas: HTMLCanvasElement;
    let chartBlocker: HTMLElement;
    let settingButton: HTMLDivElement;
    let settingContainer: HTMLDivElement;
    let settingCloseButton: HTMLElement;
    
    // class instance
    let ontuneChart: OntuneChart;

    // reactivity declaration
    $: ChartContainerStyle
        = Style.ChartContainer.getStyleByPosition( legendPosition )
    $: ChartBodyStyle
        = legendPosition == 'top' || legendPosition == 'bottom'
        ? Style.ChartBody.BODY_HORIZON
        : Style.ChartBody.BODY_VERTICAL;
    $: LegendContainerStyle
        = legendPosition == 'top' || legendPosition == 'bottom'
        ? Style.LegendContainer.CONTAINER_HORIZON
        : Style.LegendContainer.CONTAINER_VERTICAL;

    onMount(() => {
        // set canvas full size
        chartCanvas.style.width = DefaultValue.CANVAS_WIDTH;
        chartCanvas.style.height = DefaultValue.CANVAS_HEIGHT;
        
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
                    min: data.labels.length - 10,
                    max: data.labels.length,
                    ticks: {
                        minRotation: 90,
                        maxRotation: 90
                    }
                },
                y: {
                    type: 'linear',
                    min: leftYAxesMin,
                    max: leftYAxesMax,
                    display: yAxesPosition == 'left' || yAxesPosition == 'both' ? true : false,
                    position: 'left'
                },
                y1: {
                    type: 'linear',
                    min: rightYAxesMin,
                    max: rightYAxesMax,
                    display: yAxesPosition == 'right' || yAxesPosition == 'both' ? true : false,
                    position: 'right',
                }
            },
            plugins: {
                legend: {
                    display: false // 기본 레전드는 무조건 hide
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

        // plugin register
        // 아마 툴팁 정도만 추가해서 쓰지 싶다. 안쓸수도 있고.
        // plugins.push(htmlLegendPlugin);

        // set chartjs config
        config = {
            type: chartType,
            data: data,
            options: options,
            plugins: plugins
        };

        // set global line width
        OntuneChart.setGlobalLineWidth( globalLineWidth, data );

        // make ontuneChart main instance
        ontuneChart = new OntuneChart( chartCanvas, config );
        ontuneChart.makeLegend( 'ontune_chart_legend_container', legendOptions );

        // component event binding
        settingButton.onclick = ( event: MouseEvent ) => {
            chartBlocker.style.display = 'block';
            settingContainer.style.display = 'block';
        };
        settingCloseButton.onclick = ( event: MouseEvent ) => {
            chartBlocker.style.display = 'none';
            settingContainer.style.display = 'none';
        };
    });
</script>

<div class="ontune_chart_component" style="width: {componentWidth}px; height: {componentHeight}px">
    <div bind:this={settingContainer} class="ontune_chart_setting_container">
        <div bind:this={settingCloseButton} class="ontune_chart_setting_close_button">
            x &nbsp;
        </div>
        storybook의 옵션 패널에서 옵션 변경 가능
    </div>
    <div bind:this={chartBlocker} class="ontune_chart_block"></div>
    <div class="ontune_chart_title_container">
        <div class="ontune_chart_title">
            타이틀 : CPU
        </div>
        <div bind:this={settingButton} class="ontune_chart_config">
            설정
        </div>
    </div>
    <div class="ontune_chart_container" style="{ChartContainerStyle}">
        <div class="ontune_chart_body" style="{ChartBodyStyle}">
            <canvas bind:this={chartCanvas} id="ontuneChart"></canvas>
        </div>
        <div id="ontune_chart_legend_container" class="ontune_chart_legend_container" style="{LegendContainerStyle}">
            
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
        position: relative;
        flex-direction: column;
    }
    
    .ontune_chart_block {
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: black;
        opacity: 0.7;
        display: none;
        z-index: 5;
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
        cursor: pointer;
    }
    
    .ontune_chart_container {
        display: flex;
        width: 100%;
        height: 80%;
    }
    
    .ontune_chart_legend_container {
        overflow-y: auto;
    }

    .ontune_chart_setting_container {
        position: absolute;
        width: 20%;
        height: 100%;
        background-color: aqua;
        right: 0;
        display: none;
        z-index: 10;
    }

    .ontune_chart_setting_close_button {
        text-align: end;
        cursor: pointer;
        height: 20px;
    }
</style>
