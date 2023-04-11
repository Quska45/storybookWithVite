<script lang="ts">
    import type { ChartConfiguration, ChartData, ChartDataset, ChartOptions, ChartTypeRegistry, LayoutPosition, Plugin, TooltipItem } from "chart.js";
    import { onMount } from "svelte";
    import { OntuneChart } from "./OntuneChart/OntuneChart";
    import { DefaultValue, Style } from "./OntuneChart/OntuneChartConst";
    import type { IEventIndicator, TAODMaxTooltipPostion, TEventIndicatorPosition, TLengendOptions, TYAxesPosition } from "./OntuneChart/OntuneChartType";
    import { CrossHairLabel } from "./OntuneChart/OntuneChartPlugins/CrossHairLabel2";
    import { Indicator } from "./OntuneChart/OntuneChartPlugins/indicator";
    import { MaxValueTooltip } from "./OntuneChart/OntuneChartPlugins/AodMaxValueTooltip/AodMaxValueTooltip2";
    import { ResizeBars } from "./OntuneChart/OntuneComponent/ResizeBar";
    import type { ResizeBar } from "./OntuneChart/OntuneComponent/ResizeBar/ResizeBar";
    import type { EventIndicator } from "./OntuneChart/OntuneChartPlugins/EventIndicator/EventIndicator2";
    import { EventIndicators } from "./OntuneChart/OntuneChartPlugins/EventIndicator";
    import ChartDataLels from 'chartjs-plugin-datalabels'
    import { YAxesUnit } from './OntuneChart/OntuneChartPlugins/YAxesUnit/YAxesUnit';
    import { MinimapResizer } from "./OntuneChart/OntuneChartPlugins/MinimapResizer2";
    import { CanvasLegendMargin } from "./OntuneChart/OntuneChartPlugins/CanvasLegendMargin2";
    import OnTuneGrid from "./onTuneGrid/OnTuneGrid.svelte";
    import { OntuneGridOptionsMaker } from "./OntuneGridOption/OntuneGridOptionMaker.svelte";
    import "tailwindcss/tailwind.css";
    import type { MiniMap } from "./OntuneChart/OntuneComponent/MiniMap/MiniMap";

    // global
    let isMount = false;

    // props
    export let componentWidth: number = DefaultValue.COMPONENT_WIDTH;
    export let componentHeight: number = DefaultValue.COMPONENT_HEIGHT;
    export let chartType: keyof ChartTypeRegistry = DefaultValue.CHART_TYPE as keyof ChartTypeRegistry;
    export let showLegend: boolean = DefaultValue.SHOW_LEGEND;
    export let legendPosition: LayoutPosition = DefaultValue.LEGEND_POSITION as LayoutPosition;
    export let showCanvasLegend: boolean = DefaultValue.SHOW_CANVAS_LEGEND;
    export let canvasLegendPosition: LayoutPosition = DefaultValue.CANVAS_LEGEND_POSITION as LayoutPosition;
    export let leftYAxesMin: number = DefaultValue.LEFT_Y_AXES_MIN;
    export let leftYAxesMax: number = DefaultValue.LEFT_Y_AXES_MAX;
    export let rightYAxesMin: number = DefaultValue.RIGHT_Y_AXES_MIN;
    export let rightYAxesMax: number = DefaultValue.RIGHT_Y_AXES_MAX;
    export let yAxesPosition: TYAxesPosition = DefaultValue.Y_AXES_POSITION as TYAxesPosition;
    export let showLegendValue: boolean = DefaultValue.SHOW_LEGEND_VALUE;
    export let globalLineWidth: number = DefaultValue.GLOBAL_LINE_WIDTH;
    export let showCrossHair: boolean = DefaultValue.SHOW_CROSS_HAIR;
    export let useIndicator: boolean = DefaultValue.USE_INDICATOR;
    export let useAnimation: boolean = DefaultValue.USE_ANIMATION;
    export let aodMaxTooltipPosition: TAODMaxTooltipPostion = DefaultValue.AOD_MAX_TOOLTIP_POSITION as TAODMaxTooltipPostion;
    export let showAodMaxTooltip: boolean = DefaultValue.SHOW_AOD_MAX_TOOLTIP;
    export let showLevel1Event: boolean = DefaultValue.SHOW_LEVEL_1_EVENT;
    export let showLevel2Event: boolean = DefaultValue.SHOW_LEVEL_2_EVENT;
    export let showLevel3Event: boolean = DefaultValue.SHOW_LEVEL_3_EVENT;
    export let showLevel4Event: boolean = DefaultValue.SHOW_LEVEL_4_EVENT;
    export let showLevel5Event: boolean = DefaultValue.SHOW_LEVEL_5_EVENT;
    export let level1EventValue: number = DefaultValue.LEVEL_1_EVENT_VALUE;
    export let level2EventValue: number = DefaultValue.LEVEL_2_EVENT_VALUE;
    export let level3EventValue: number = DefaultValue.LEVEL_3_EVENT_VALUE;
    export let level4EventValue: number = DefaultValue.LEVEL_4_EVENT_VALUE;
    export let level5EventValue: number = DefaultValue.LEVEL_5_EVENT_VALUE;
    export let level1EventLineWidth: number = DefaultValue.LEVEL_1_EVENT_LINE_WIDTH;
    export let level2EventLineWidth: number = DefaultValue.LEVEL_2_EVENT_LINE_WIDTH;
    export let level3EventLineWidth: number = DefaultValue.LEVEL_3_EVENT_LINE_WIDTH;
    export let level4EventLineWidth: number = DefaultValue.LEVEL_4_EVENT_LINE_WIDTH;
    export let level5EventLineWidth: number = DefaultValue.LEVEL_5_EVENT_LINE_WIDTH;
    export let level1EventPosition: TEventIndicatorPosition = DefaultValue.LEVEL_1_EVENT_POSITION as TEventIndicatorPosition;
    export let level2EventPosition: TEventIndicatorPosition = DefaultValue.LEVEL_2_EVENT_POSITION as TEventIndicatorPosition;
    export let level3EventPosition: TEventIndicatorPosition = DefaultValue.LEVEL_3_EVENT_POSITION as TEventIndicatorPosition;
    export let level4EventPosition: TEventIndicatorPosition = DefaultValue.LEVEL_4_EVENT_POSITION as TEventIndicatorPosition;
    export let level5EventPosition: TEventIndicatorPosition = DefaultValue.LEVEL_5_EVENT_POSITION as TEventIndicatorPosition;
    export let yAxesUnit: string = DefaultValue.Y_AXES_UNIT;
    export let showYAxesUnit: boolean = DefaultValue.SHOW_Y_AXES_UNIT;
    export let lineTension: number = DefaultValue.LINE_TENSION;
    export let showDataValueTooltip: boolean = DefaultValue.SHOW_DATA_VALUE_TOOLTIP;
    export let labels: unknown[] = [];
    export let datasets: ChartDataset[] = [];

    // data object
    const legendOptions: TLengendOptions = { position: legendPosition, showLegend: showLegend, showLegendValue: showLegendValue };
    let data: ChartData = { labels: labels, datasets: datasets };
    let options: ChartOptions = {};
    let minimapOptions: ChartOptions = {};
    let config: ChartConfiguration;
    let minimapConfig: ChartConfiguration;
    let plugins: Plugin[] = [];
    
    // dom element
    let chartCanvas: HTMLCanvasElement;
    let blocker: HTMLElement;
    let chartContainer: HTMLElement;
    let chartBody: HTMLElement;
    let legendConatiner: HTMLElement;
    let zoomContainer: HTMLElement;
    let zoomReset: HTMLElement;
    let resizeBar: HTMLElement;
    let minimapCanvas: HTMLCanvasElement;
    let minimapLeft: HTMLElement;
    let minimapCenter: HTMLElement;
    let minimapRight: HTMLElement;
    
    // class instance
    let ontuneChart: OntuneChart;
    let ontuneChartResizeBar: ResizeBar;
    let minimap: MiniMap;

    // reactivity declaration
    $: ChartContainerStyle
        = Style.ChartContainer.getStyleByPosition( legendPosition )
    $: ChartBodyStyle
        = Style.ChartBody.getStyleByPositionAndShowLegend( legendPosition, showLegend )
    $: ResizeBarStyle
        = Style.ResizeBar.getStyleByPositionAndShowLegend( legendPosition, showLegend )
    $: LegendContainerStyle
        = Style.LegendContainer.getStyleByPositionAndShowLegend( legendPosition, showLegend )

    // showYAxesUnit
    $: if( isMount && showYAxesUnit ){
        ontuneChart.addPlugin( yAxesUnitPlugin.plugin );
    };
    $: if( isMount && !showYAxesUnit ){
        let yAxesUnitPluginIndex = plugins.findIndex(( plugin ) => {
            return plugin === yAxesUnitPlugin.plugin;
        });
        ontuneChart.removePluginByPluginIndex( yAxesUnitPluginIndex );
    };
    // useIndicator
    $: if( isMount && useIndicator ){
        ontuneChart.addPlugin( Indicator );
    };
    $: if( isMount && !useIndicator ){
        ontuneChart.removePlugin( Indicator );
    };
    // showCrossHair
    $: if( isMount && showCrossHair ){
        ontuneChart.addPlugin( CrossHairLabel );
    };
    $: if( isMount && !showCrossHair ){
        ontuneChart.removePlugin( CrossHairLabel );
    };
    // showAodMaxTooltip
    $: if( isMount && showAodMaxTooltip ){
        ontuneChart.addPlugin( MaxValueTooltip );
    };
    $: if( isMount && !showAodMaxTooltip ){
        ontuneChart.removePlugin( MaxValueTooltip );
    };
    // showDataValueTooltip
    $: if( isMount && showDataValueTooltip ){
        ontuneChart.addPlugin( ChartDataLels );
    };
    $: if( isMount && !showDataValueTooltip ){
        ontuneChart.removePlugin( ChartDataLels );
    };

    // plugins
    let eventIndicatorInfos: IEventIndicator[] = [];
    eventIndicatorInfos.push( {id: 'eventIndicator1', isShow: showLevel1Event, value: level1EventValue, color: 'rgb(153,204,255)', level: 1, lineWidth: level1EventLineWidth, position: level1EventPosition} );
    eventIndicatorInfos.push( {id: 'eventIndicator2', isShow: showLevel2Event, value: level2EventValue, color: 'rgb(127,255,0)', level: 2, lineWidth: level2EventLineWidth, position: level2EventPosition} );
    eventIndicatorInfos.push( {id: 'eventIndicator3', isShow: showLevel3Event, value: level3EventValue, color: 'rgb(255,255,0)', level: 3, lineWidth: level3EventLineWidth, position: level3EventPosition} );
    eventIndicatorInfos.push( {id: 'eventIndicator4', isShow: showLevel4Event, value: level4EventValue, color: 'rgb(255,165,0)', level: 4, lineWidth: level4EventLineWidth, position: level4EventPosition} );
    eventIndicatorInfos.push( {id: 'eventIndicator5', isShow: showLevel5Event, value: level5EventValue, color: 'rgb(255,0,0)', level: 5, lineWidth: level5EventLineWidth, position: level5EventPosition} );
    let eventIndicators: EventIndicator[] = [];
    eventIndicatorInfos.forEach(( eventIndicatorInfo ) => {
        let eventIndicator: EventIndicator = new EventIndicators[ eventIndicatorInfo.position ](
            eventIndicatorInfo.id,
            eventIndicatorInfo.value,
            eventIndicatorInfo.level,
            eventIndicatorInfo.isShow,
            eventIndicatorInfo.color,
            eventIndicatorInfo.lineWidth,
            eventIndicatorInfo.position
        );

        eventIndicators.push( eventIndicator );
    });

    let yAxesUnitPlugin = new YAxesUnit( yAxesUnit );
    let minimapResizer: MinimapResizer;


    let legendGridOptions;

    onMount(() => {
        // set chartjs options
        options = {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    top: 30,
                    right: 30,
                    bottom: 40,
                },
            },
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
                    display: showCanvasLegend,
                    position: canvasLegendPosition,
                    align: 'start',
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
                        },
                        onZoom: function(){
                            zoomContainer.style.display = 'flex';
                            zoomReset.style.display = 'block';

                            ontuneChart.resizeMinimapController.bind( ontuneChart )();
                        },
                    },
                    pan: {
                        enabled: true,
                        mode: 'xy',
                        modifierKey: 'ctrl',
                        threshold: 10,
                        onPan: () => {
                            ontuneChart.resizeMinimapController.bind( ontuneChart )();
                        }
                    },
                }
            },
        };

        minimapOptions = {
            maintainAspectRatio: false,
            scales: {
                x: {
                    display: false
                },
                y: {
                    display: false
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            }
        };

        MaxValueTooltip.aodMaxTooltipPosition = aodMaxTooltipPosition;
        eventIndicators.forEach(( eventIndicator ) => {
            eventIndicator.isShow ? plugins.push( eventIndicator.plugin ) : null;
        });
        let canvasLegendMargin = new CanvasLegendMargin();
        plugins.push( canvasLegendMargin.plugin );

        // set chartjs config
        config = {
            type: chartType,
            data: data,
            options: options,
            plugins: plugins
        };

        // set global line width
        OntuneChart.setAllDataByLineWidth( data, globalLineWidth );
        
        // make ontuneChart main instance
        ontuneChart = new OntuneChart( chartCanvas, config );
        let legendItems = ontuneChart.getLegendItems();
        // ontuneChart.makeLegend( 'ontune_chart_legend_container', legendOptions );

        // make OntuneGrid legend
        OntuneGridOptionsMaker.setOntuneChart( ontuneChart );
        let legendData = OntuneGridOptionsMaker.getOntuneGridData( legendItems, ontuneChart.chart );
        legendGridOptions = OntuneGridOptionsMaker.getOntuneGridOptions( legendData, legendConatiner.style.height );

        // make ontuneChart minimap
        // ontuneChart.makeMinimap( minimapCanvas );
        // ontuneChart.setMinimapController( minimapLeft, minimapCenter, minimapRight );
        // minimap = new MiniMap(  );

        // set chart make after plugins
        minimapResizer = new MinimapResizer( ontuneChart );
        ontuneChart.addPlugin( minimapResizer.plugin );

        // make ontuneChart support instance
        ontuneChartResizeBar = new ResizeBars[ legendPosition as string ]( resizeBar );
        ontuneChartResizeBar.setFirstAndSecondSide( chartBody, legendConatiner );

        /**
         * component event binding
        */
        // zoom
        zoomReset.addEventListener('click', ( event: MouseEvent ) => {
            ontuneChart.resetZoom();
            zoomContainer.style.display = 'none';
        });

        // resize
        resizeBar.addEventListener('mousedown', ontuneChartResizeBar.mouseDownHandler.bind( ontuneChartResizeBar ) );

        // // chart category input button
        // chartCategoryInput.value = chartCategorySelect.value;
        // chartCategoryInput.dataset.id = chartCategorySelect.value;
        // chartCategoryButton.addEventListener('click', () => {
        //     let categoryId = chartCategoryInput.dataset.id;
        //     let newCategoryName = chartCategoryInput.value;
        //     let categoryIndex = chartCatetories.findIndex(( category ) => {
        //         return category.id == categoryId;
        //     });

        //     chartCatetories[ categoryIndex ].name = newCategoryName;
        // });

        // // chart category selectbox
        // chartCategorySelect.addEventListener('change', () => {
        //     chartCategoryInput.value = chartCategorySelect.options[chartCategorySelect.selectedIndex].text;
        //     chartCategoryInput.dataset.id = chartCategorySelect.value;
        //     ontuneChart.destroyLegend( 'ontune_chart_legend_container' );
        //     ontuneChart.destroy();
            
        //     const labels = TestDataMaker.getTerm();
        //     const hosts = TestDataMaker.getHost( globalLineWidth, lineTension );
        //     config.data.labels = labels;
        //     config.data.datasets = hosts;

        //     ontuneChart = new OntuneChart( chartCanvas, config );
        //     ontuneChart.makeLegend( 'ontune_chart_legend_container', legendOptions );
        // });

        // document.getElementById('test').addEventListener('click', function(){
        //     showAodMaxTooltip = !showAodMaxTooltip;
        // });

        isMount = true;
    });


</script>

<div class="ontune_chart_component" style="width: {componentWidth}px; height: {componentHeight}px">
    <!-- <button id="test">showMaxValueTooltip</button> -->
    <!-- blocker -->
    <div bind:this={blocker} class="ontune_chart_block"></div>

    <!-- 차트 영역 -->
    <div bind:this={chartContainer} class="ontune_chart_container" style="{ChartContainerStyle}">

        <!-- chartjs가 그려지는 영역 -->
        <div bind:this={chartBody} class="ontune_chart_body" style="{ChartBodyStyle}">

            <!-- zoom에 대한 컨텍스트 메뉴 여역 -->
            <div bind:this={zoomContainer} class="ontune_chart_zoom_container">
                <!-- <div class="ontune_chart_zoom_item">zoom start</div> -->
                <div bind:this={zoomReset} class="ontune_chart_zoom_item ontune_chart_zoom_reset">zoom 원복</div>
            </div>
                <canvas bind:this={chartCanvas} id="ontuneChart"></canvas>
                <div class="chart_timeline">
                    <canvas bind:this={minimapCanvas} class="chart_timeline_canvas" id="minimapChart" height="40"></canvas>
            
                    <div bind:this={minimapLeft} id="left" class="chart_timeline_rest_left" style="width: 0%;"></div>
                    <div bind:this={minimapCenter} id="center" class="chart_timeline_handle" style="left: 0%; right: 0%;">
                      <div class="chart_timeline_handle_touch_area"></div>
                    </div>
                    <div bind:this={minimapRight} id="right" class="chart_timeline_rest_right" style="width: 0%;"></div>
                </div>
        </div>

        <!-- chartjs영역과 레전드 영역의 resizebar -->
        <div bind:this={resizeBar} id="ontune_chart_resize_bar" class="ontune_chart_resize_bar" style="{ResizeBarStyle}"></div>

        <!-- 레전드 영역 -->
        <div bind:this={legendConatiner} id="ontune_chart_legend_container" class="ontune_chart_legend_container" style="{LegendContainerStyle}">
            <div></div>
            {#if legendGridOptions}
                <OnTuneGrid
                    options={ legendGridOptions }
                    w={Number(legendConatiner.style.width)}
                ></OnTuneGrid>
            {/if}
            <!-- <div bind:this={serieseResizer} class="ontune_chart_seriese_resizer"></div> -->
        </div>
    </div>
</div>

<style>
    @import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css);
    * { font-family: 'Spoqa Han Sans Neo', 'sans-serif'; }
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

    .ontune_chart_body {
        position: relative;
    }
    
    .ontune_chart_container {
        display: flex;
        width: 100%;
        height: 100%;
    }
    
    .ontune_chart_legend_container {
        position: relative;
    }
    
    .ontune_chart_resize_bar {
        border: 2px solid blue;
    }
    
    .ontune_chart_zoom_container {
        width: 100%;
        height: 20px;
        display: none;
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
    .ontune_chart_zoom_item:active {
        color: red;
    }
    .ontune_chart_seriese_resizer {
        width: 70px;
        height: 30px;
        position: absolute;
        left: 0;
        top: 0;
        border: 1px solid red;
    }

    .ontune_chart_zoom_reset {
        display: none;
    }

    .chart_timeline {
        position: relative;
        height: 40px;
        border: 1px solid #ddd;
        border-radius: 6px;
        margin-top: -40px;
    }
    .chart_timeline_canvas {
        height: 40px;
        border-radius: 5px;
    }

    .chart_timeline_handle {
        cursor: ew-resize;
        z-index: 1;
        position: absolute;
        top: -1px;
        bottom: -1px;
        right: 0;
        border: #C0D1E1 solid;
        border-width: 1px 10px;
        border-radius: 5px;
        box-sizing: border-box;
        box-shadow: 0 0 0 1px #fff, inset 1px 0 0 0 #fff, inset -1px 0 0 0 #fff;
        /*   cursor: pointer; */
        touch-action: pan-x;
        user-select: none;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
    }
    .chart_timeline_handle_touch_area {
        position: absolute;
        height: 100%;
        left: -20px;
        right: -20px;
        border: none;
    }
    .chart_timeline_handle::before,
    .chart_timeline_handle::after {
        content: '';
        position: absolute;
        left: -6px;
        top: 15px;
        bottom: 15px;
        width: 2px;
        background: #fff;
        border-radius: 2px;
    }
    .chart_timeline_handle:after {
        left: auto;
        right: -6px;
    }
    .chart_timeline_rest_left,
    .chart_timeline_rest_right {
        position: absolute;
        top: 0;
        background: rgba(226, 238, 249, 0.5);
        height: 100%;
        padding: 0 5px;
        border-radius: 5px;
    }
    .chart_timeline_rest_left {
        left: 0;
    }
    .chart_timeline_rest_right {
        right: 0;
    }
</style>
