<script lang="ts">
    import type { ChartConfiguration, ChartData, ChartDataset, ChartOptions, ChartTypeRegistry, LayoutPosition, Plugin, TooltipItem } from "chart.js";
    import { onMount } from "svelte";
    import { OntuneChart } from "./OntuneChart/OntuneChart";
    import { DefaultValue, Style } from "./OntuneChart/OntuneChartConst";
    import type { TLengendOptions, TYAxesPosition } from "./OntuneChart/OntuneChartType";
    import { crossHairLabel } from "./OntuneChart/OntuneChartPlugins/crossHairLabel";
    import { indicator } from "./OntuneChart/OntuneChartPlugins/indicator";
    import type { ResizeBar } from "./OntuneChart/OntuneComponent/ResizeBar/ResizeBar";
    import { OntuneChartData } from "./OntuneChart/OntuneChartData";
    import type { SerieseResizer } from "./OntuneChart/OntuneComponent/SerieseResizer";
    import { RightResizeBar } from "./OntuneChart/OntuneComponent/ResizeBar/RightResizeBar";
    import { LeftResizeBar } from "./OntuneChart/OntuneComponent/ResizeBar/LeftResizeBar";
    import { TopResizeBar } from "./OntuneChart/OntuneComponent/ResizeBar/TopResizebar";
    import { BottomResizeBar } from "./OntuneChart/OntuneComponent/ResizeBar/BottomResizebar";

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
    let blocker: HTMLElement;
    let chartContainer: HTMLElement;
    let chartBody: HTMLElement;
    let legendConatiner: HTMLElement;
    let settingButton: HTMLDivElement;
    let settingContainer: HTMLDivElement;
    let settingCloseButton: HTMLElement;
    let zoomReset: HTMLElement;
    let resizeBar: HTMLElement;
    let serieseResizer: HTMLElement;
    
    // class instance
    let ontuneChart: OntuneChart;
    let ontuneChartResizeBar: ResizeBar;
    let ontuneChartSerieseResizer: SerieseResizer

    // reactivity declaration
    $: ChartContainerStyle
        = Style.ChartContainer.getStyleByPosition( legendPosition )
    $: ChartBodyStyle
        = Style.ChartBody.getStyleByPositionAndShowLegend( legendPosition, showLegend )
    $: ResizeBarStyle
        = Style.ResizeBar.getStyleByPositionAndShowLegend( legendPosition, showLegend )
    $: LegendContainerStyle
        = Style.LegendContainer.getStyleByPositionAndShowLegend( legendPosition, showLegend )

    onMount(() => {
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
        OntuneChartData.setAllDataByLineWidth( data, globalLineWidth );

        // make ontuneChart main instance
        ontuneChart = new OntuneChart( chartCanvas, config );
        ontuneChart.makeLegend( 'ontune_chart_legend_container', legendOptions );

        // make ontuneChart support instance
        if( legendPosition == 'top' ){
            ontuneChartResizeBar = new TopResizeBar( resizeBar );
        } else if(legendPosition == 'right'){
            ontuneChartResizeBar = new RightResizeBar( resizeBar );
        } else if(legendPosition == 'bottom'){
            ontuneChartResizeBar = new BottomResizeBar( resizeBar );
        } else {
            ontuneChartResizeBar = new LeftResizeBar( resizeBar );
        };
        ontuneChartResizeBar.setFirstAndSecondSide( chartBody, legendConatiner );

        /**
         * component event binding
        */
        // setting
        settingButton.addEventListener('click', ( event: MouseEvent ) => {
            blocker.style.display = 'block';
            settingContainer.style.display = 'block';
        });
        settingCloseButton.addEventListener('click', ( event: MouseEvent ) => {
            blocker.style.display = 'none';
            settingContainer.style.display = 'none';
        });

        // zoom
        zoomReset.addEventListener('click', ( event: MouseEvent ) => {
            ontuneChart.resetZoom();
        });

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
    <div bind:this={blocker} class="ontune_chart_block"></div>
    <div class="ontune_chart_title_container">
        <div class="ontune_chart_title">
            타이틀 : CPU
        </div>
        <div bind:this={settingButton} class="ontune_chart_config">
            설정
        </div>
    </div>
    <div bind:this={chartContainer} class="ontune_chart_container" style="{ChartContainerStyle}">
        <div bind:this={chartBody} class="ontune_chart_body" style="{ChartBodyStyle}">
            <div class="ontune_chart_zoom_container">
                <!-- <div class="ontune_chart_zoom_item">zoom start</div> -->
                <div bind:this={zoomReset} class="ontune_chart_zoom_item ontune_chart_zoom_reset">zoom 원복</div>
            </div>
            <canvas bind:this={chartCanvas} id="ontuneChart"></canvas>
        </div>
        <div bind:this={resizeBar} id="ontune_chart_resize_bar" class="ontune_chart_resize_bar" style="{ResizeBarStyle}">

        </div>
        <div bind:this={legendConatiner} id="ontune_chart_legend_container" class="ontune_chart_legend_container" style="{LegendContainerStyle}">
            <div></div>
            <!-- <div bind:this={serieseResizer} class="ontune_chart_seriese_resizer"></div> -->
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
        height: 50px;
    }

    .ontune_chart_body {
        position: relative;
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
        height: calc(100% - 50px);
    }
    
    .ontune_chart_legend_container {
        position: relative;
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
    
    .ontune_chart_resize_bar {
        border: 2px solid blue;
    }
    
    .ontune_chart_zoom_container {
        width: 100%;
        height: 20px;
        display: flex;
        flex-flow: column;
        flex-direction: row-reverse;
        position: absolute;
        border: none;
    }
    .ontune_chart_zoom_item {
        width: 70px;
        height: 100%;
        font-size: 14px;
        cursor: pointer;
    }
    .ontune_chart_zoom_item:active{
        color: red;
    }
    .ontune_chart_seriese_resizer{
        width: 70px;
        height: 30px;
        position: absolute;
        left: 0;
        top: 0;
        border: 1px solid red;
    }
</style>
