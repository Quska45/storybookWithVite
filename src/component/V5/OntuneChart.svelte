<script lang="ts">
    import type { ChartConfiguration, ChartData, ChartDataset, ChartOptions, ChartTypeRegistry, LayoutPosition, Plugin, TooltipItem } from "chart.js";
    import { onMount } from "svelte";
    import { OntuneChart } from "./OntuneChart/OntuneChart";
    import { DefaultValue, Style } from "./OntuneChart/OntuneChartConst";
    import { OntuneChartProps, type IEventIndicator, type TAODMaxTooltipPostion, type TEventIndicatorPosition, type TLengendOptions, type TOntuneChartProps, type TYAxesPosition } from "./OntuneChart/OntuneChartType";
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
    import { OntuneGridOptionsMaker, makeColums } from "./OntuneGridOption/OntuneGridOptionMaker.svelte";
    import "tailwindcss/tailwind.css";
    import MiniMap from "./OntuneChart/OntuneComponent/MiniMap/MiniMap.svelte";

    // global
    let isMount = false;
    let ocp: OntuneChartProps;
    const defaultValue = {...DefaultValue};

    // props
    export let uuid: string;
    export let componentWidth: number = defaultValue.COMPONENT_WIDTH;
    export let componentHeight: number = defaultValue.COMPONENT_HEIGHT;
    export let chartType: keyof ChartTypeRegistry = defaultValue.CHART_TYPE as keyof ChartTypeRegistry;
    export let showLegend: boolean = defaultValue.SHOW_LEGEND;
    export let legendPosition: LayoutPosition = defaultValue.LEGEND_POSITION as LayoutPosition;
    export let showCanvasLegend: boolean = defaultValue.SHOW_CANVAS_LEGEND;
    export let canvasLegendPosition: LayoutPosition = defaultValue.CANVAS_LEGEND_POSITION as LayoutPosition;
    export let leftYAxesMin: number = defaultValue.LEFT_Y_AXES_MIN;
    export let leftYAxesMax: number = defaultValue.LEFT_Y_AXES_MAX;
    export let rightYAxesMin: number = defaultValue.RIGHT_Y_AXES_MIN;
    export let rightYAxesMax: number = defaultValue.RIGHT_Y_AXES_MAX;
    export let yAxesPosition: TYAxesPosition = defaultValue.Y_AXES_POSITION as TYAxesPosition;
    export let showLegendValue: boolean = defaultValue.SHOW_LEGEND_VALUE;
    export let globalLineWidth: number = defaultValue.GLOBAL_LINE_WIDTH;
    export let showCrossHair: boolean = defaultValue.SHOW_CROSS_HAIR;
    export let useIndicator: boolean = defaultValue.USE_INDICATOR;
    export let useAnimation: boolean = defaultValue.USE_ANIMATION;
    export let aodMaxTooltipPosition: TAODMaxTooltipPostion = defaultValue.AOD_MAX_TOOLTIP_POSITION as TAODMaxTooltipPostion;
    export let showAodMaxTooltip: boolean = defaultValue.SHOW_AOD_MAX_TOOLTIP;
    export let showLevel1Event: boolean = defaultValue.SHOW_LEVEL_1_EVENT;
    export let showLevel2Event: boolean = defaultValue.SHOW_LEVEL_2_EVENT;
    export let showLevel3Event: boolean = defaultValue.SHOW_LEVEL_3_EVENT;
    export let showLevel4Event: boolean = defaultValue.SHOW_LEVEL_4_EVENT;
    export let showLevel5Event: boolean = defaultValue.SHOW_LEVEL_5_EVENT;
    export let level1EventValue: number = defaultValue.LEVEL_1_EVENT_VALUE;
    export let level2EventValue: number = defaultValue.LEVEL_2_EVENT_VALUE;
    export let level3EventValue: number = defaultValue.LEVEL_3_EVENT_VALUE;
    export let level4EventValue: number = defaultValue.LEVEL_4_EVENT_VALUE;
    export let level5EventValue: number = defaultValue.LEVEL_5_EVENT_VALUE;
    export let level1EventLineWidth: number = defaultValue.LEVEL_1_EVENT_LINE_WIDTH;
    export let level2EventLineWidth: number = defaultValue.LEVEL_2_EVENT_LINE_WIDTH;
    export let level3EventLineWidth: number = defaultValue.LEVEL_3_EVENT_LINE_WIDTH;
    export let level4EventLineWidth: number = defaultValue.LEVEL_4_EVENT_LINE_WIDTH;
    export let level5EventLineWidth: number = defaultValue.LEVEL_5_EVENT_LINE_WIDTH;
    export let level1EventPosition: TEventIndicatorPosition = defaultValue.LEVEL_1_EVENT_POSITION as TEventIndicatorPosition;
    export let level2EventPosition: TEventIndicatorPosition = defaultValue.LEVEL_2_EVENT_POSITION as TEventIndicatorPosition;
    export let level3EventPosition: TEventIndicatorPosition = defaultValue.LEVEL_3_EVENT_POSITION as TEventIndicatorPosition;
    export let level4EventPosition: TEventIndicatorPosition = defaultValue.LEVEL_4_EVENT_POSITION as TEventIndicatorPosition;
    export let level5EventPosition: TEventIndicatorPosition = defaultValue.LEVEL_5_EVENT_POSITION as TEventIndicatorPosition;
    export let yAxesUnit: string = defaultValue.Y_AXES_UNIT;
    export let showYAxesUnit: boolean = defaultValue.SHOW_Y_AXES_UNIT;
    export let lineTension: number = defaultValue.LINE_TENSION;
    export let showDataValueTooltip: boolean = defaultValue.SHOW_DATA_VALUE_TOOLTIP;
    export let labels: unknown[] = [];
    export let datasets: ChartDataset[] = [];

    ocp = new OntuneChartProps({componentWidth, componentHeight, chartType, showLegend, legendPosition, showCanvasLegend, canvasLegendPosition, leftYAxesMin, leftYAxesMax, rightYAxesMin, rightYAxesMax, yAxesPosition, showLegendValue, globalLineWidth, showCrossHair, useIndicator, useAnimation, aodMaxTooltipPosition, showAodMaxTooltip, showLevel1Event, showLevel2Event, showLevel3Event, showLevel4Event, showLevel5Event, level1EventValue, level2EventValue, level3EventValue, level4EventValue, level5EventValue, level1EventLineWidth, level2EventLineWidth, level3EventLineWidth, level4EventLineWidth, level5EventLineWidth, level1EventPosition, level2EventPosition, level3EventPosition, level4EventPosition, level5EventPosition, yAxesUnit, showYAxesUnit, lineTension, showDataValueTooltip, labels, datasets});

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
    let zoomContainer: HTMLElement;
    let zoomReset: HTMLElement;
    let resizeBar: HTMLElement;
    let minimapCanvas: HTMLCanvasElement;
    
    // class instance
    let ontuneChart: OntuneChart;
    let ontuneChartResizeBar: ResizeBar;
    // let minimap: MiniMap;

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
            resizeDelay: 50,
            layout: {
                padding: {
                    top: 30,
                    right: 30,
                    // bottom: 40,
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

                            const { scales: {x} } = ontuneChart.chart;
                            ontuneChart.minimap.zoomBox( x.min, x.max );
                        },
                    },
                    pan: {
                        enabled: true,
                        mode: 'xy',
                        modifierKey: 'ctrl',
                        threshold: 10,
                        onPan: () => {
                            console.log( 'ontuneChart.minimap', ontuneChart.minimap );
                        }
                    },
                }
            },
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

        // make OntuneGrid legend
        let optionsMaker = OntuneGridOptionsMaker.getOntuneGridOptionsMaker( ontuneChart );
        let columns = makeColums( optionsMaker.ontuneChart, optionsMaker.ontuneGridColorPicker );
        let legendData = optionsMaker.getOntuneGridData( legendItems, ontuneChart.chart );
        legendGridOptions = optionsMaker.getOntuneGridOptions( legendData, legendConatiner.style.height, columns );

        // make ontuneChart minimap
        ontuneChart.makeMinimap( minimapCanvas );

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

            const { scales: {x} } = ontuneChart.chart;
            ontuneChart.minimap.zoomBox( x.min, x.max );
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

    // class Test{
    //     test: number;
    // }
</script>

<!-- <div class="ontune_chart_component" style="width: {componentWidth}px; height: {componentHeight}px"> -->
<div style="width: 800px; height: 500px;">
<div class="ontune_chart_component" style="width: 100%; height: 100%">
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
            <div style="height: calc(100% - 40px);">
                <canvas bind:this={chartCanvas} id="ontuneChart"></canvas>
            </div>
            <div class="chart_minimap_container">
                <canvas bind:this={minimapCanvas} class="minimap_canvas" id="minimapChart"  style="width: 100%;"></canvas>
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
        </div>
    </div>
</div>
</div>

<style>
    @import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css);
    * { font-family: 'Spoqa Han Sans Neo', 'sans-serif'; }
    div {
        margin: 0;
        padding: 0;
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
    
    .ontune_chart_zoom_reset {
        display: none;
    }

    .chart_minimap_container {
        position: relative;
        height: 40px;
        border: 1px solid #ddd;
        border-radius: 6px;
        /* margin-top: -40px; */
    }
    .minimap_canvas {
        height: 40px;
        border-radius: 5px;
    }
</style>
