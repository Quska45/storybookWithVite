<script lang="ts">
    import type { ChartConfiguration, ChartData, ChartDataset, ChartOptions, ChartTypeRegistry, LayoutPosition, Plugin, TooltipItem } from "chart.js";
    import { onMount } from "svelte";
    import { OntuneChart } from "./OntuneChart/OntuneChart";
    import { DefaultValue, Style } from "./OntuneChart/OntuneChartConst";
    import type { TLengendOptions, TYAxesPosition } from "./OntuneChart/OntuneChartType";
    import { crossHairLabel } from "./OntuneChart/OntuneChartPlugins/crossHairLabel";
    import { indicator } from "./OntuneChart/OntuneChartPlugins/indicator";
    import { chart } from "highcharts";
    import { ResizeBar } from "./OntuneChart/OntuneComponent/ResizeBar";

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
    export let showCrossHair: boolean = DefaultValue.SHOW_CROSS_HAIR;
    export let useIndicator: boolean = DefaultValue.USE_INDICATOR;
    export let useAnimation: boolean = DefaultValue.USE_ANIMATION
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
    let chartContainer: HTMLElement;
    let chartBody: HTMLElement;
    let chartLegendConatiner: HTMLElement;
    let settingButton: HTMLDivElement;
    let settingContainer: HTMLDivElement;
    let settingCloseButton: HTMLElement;
    let zoomReset: HTMLElement;
    let resizeBar: HTMLElement;
    
    // class instance
    let ontuneChart: OntuneChart;
    let ontuneChartResizeBar: ResizeBar;

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
            // interaction: {
            //     mode: 'dataset',
            //     intersect: false,
            // },
            hover: {
                mode: 'dataset',
                axis: 'xy',
                intersect: false
            },
            // layout: {
            //     padding: {
            //         left: 10
            //     }
            // },
            scales: {
                x: {
                    // type: 'time',
                    // time: {
                    //     unit: 'second',
                    //     displayFormats: {
                    //         second: "hh:mm:ss"
                    //     }
                    // },
                    min: data.labels.length - 10,
                    max: data.labels.length,
                    ticks: {
                        minRotation: 0,
                        maxRotation: 0
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
            transitions: {
                zoom: {
                    animation: {
                        duration: 0
                    }
                }
            },
            animation: useAnimation as false,
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
                    enabled: true,
                    // external: externalTooltipHandler,
                    position: 'average',
                    mode: 'index',
                },
                decimation: {
                    enabled: true
                },
                zoom: {
                    zoom: {
                        mode: "xy",
                        drag: {
                            enabled: true,
                            borderColor: 'rgb(54, 162, 235)',
                            borderWidth: 1,
                            backgroundColor: 'rgba(54, 162, 235, 0.3)'
                        },
                        pinch: {
                            enabled: true
                        }
                    },
                    pan: {
                        enabled: true,
                        mode: 'xy',
                        modifierKey: 'ctrl',
                        threshold: 10,
                    }
                }
            },
        };

        // plugin register
        // 아마 툴팁 정도만 추가해서 쓰지 싶다. 안쓸수도 있고.
        // plugins.push(htmlLegendPlugin);
        useIndicator ? plugins.push(indicator) : null;
        showCrossHair ? plugins.push(crossHairLabel) : null;

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

        // make ontuneChart support instance
        ontuneChartResizeBar = new ResizeBar( resizeBar );

        /**
         * component event binding
        */
        // setting
        settingButton.onclick = ( event: MouseEvent ) => {
            chartBlocker.style.display = 'block';
            settingContainer.style.display = 'block';
        };
        settingCloseButton.onclick = ( event: MouseEvent ) => {
            chartBlocker.style.display = 'none';
            settingContainer.style.display = 'none';
        };

        // zoom
        zoomReset.onclick = ( event: MouseEvent ) => {
            ontuneChart.resetZoom();
        };

        // resize
        resizeBar.addEventListener('mousedown', ontuneChartResizeBar.mouseDownHandler.bind( ontuneChartResizeBar ) );
    });
</script>

<div class="ontune_chart_component" style="width: {componentWidth}px; height: {componentHeight}px">
    <div bind:this={settingContainer} class="ontune_chart_setting_container">
        <div bind:this={settingCloseButton} class="ontune_chart_setting_close_button">
            x &nbsp;
        </div>
        화면 하단 패널에 Controls 탭에서 옵션 변경 가능.
        설정 패널의 구현은 컴포넌트 구조를 고민해보고 개발 예정.
    </div>
    <div bind:this={chartBlocker} class="ontune_chart_block"></div>
    <div class="ontune_chart_title_container">
        <div class="ontune_chart_title">
            타이틀 : CPU
        </div>
        <div class="ontune_chart_zoom_container">
            <!-- <div class="ontune_chart_zoom_item">zoom start</div> -->
            <div bind:this={zoomReset} class="ontune_chart_zoom_item ontune_chart_zoom_reset">zoom 원복</div>
        </div>
        <div bind:this={settingButton} class="ontune_chart_config">
            설정
        </div>
    </div>
    <div bind:this={chartContainer} class="ontune_chart_container" style="{ChartContainerStyle}">
        <div bind:this={chartBody} class="ontune_chart_body" style="{ChartBodyStyle}">
            <canvas bind:this={chartCanvas} id="ontuneChart"></canvas>
        </div>
        <div bind:this={resizeBar} id="ontune_chart_resize_bar" class="ontune_chart_resize_bar">

        </div>
        <div bind:this={chartLegendConatiner} id="ontune_chart_legend_container" class="ontune_chart_legend_container" style="{LegendContainerStyle}">
            
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

    .ontune_chart_zoom_container {
        width: 70px;
        height: 30px;
        display: flex;
        flex-flow: column;
        justify-content: space-between;
    }

    .ontune_chart_resize_bar {
        height: 100%;
        border: 1px solid blue;
        cursor: col-resize;
    }

    .ontune_chart_zoom_item {
        width: 100%;
        height: 100%;
        font-size: 14px;
        cursor: pointer;
    }
    .ontune_chart_zoom_item:active{
        color: red;
    }
</style>
