<script lang="ts">
    import "flowbite/dist/flowbite.css";
    import { onMount, onDestroy } from 'svelte'
    import FlowBiteSvelteLayout from './FlowBiteSvelteLayout.svelte'
    import FlowBiteSvelteButton from './FlowBiteSvelteButton.svelte'
    import FlowBiteSvelteTab from './FlowBiteSvelteTab.svelte'
    import FlowBiteSvelteTable from './FlowBiteSvelteTable.svelte'
    import { 
        Line
        , Chart
     } from 'svelte-chartjs'
    import type { 
        Chart as ChartJS
    } from 'chart.js'
    import 'chartjs-adapter-moment'
    import zoomPlugin from 'chartjs-plugin-zoom'
    import { ChartData, chartDummyData, chartLegendData, ontuneDummyData, type TOntuneData } from './TS/FlowBiteSvelteLineChart/data/FlowBiteSvelteLineChartData'
    import { currentTimeBeforSecond, data, dataUtil, options, randomColorFactor, zoomOption, } from './TS/FlowBiteSvelteLineChart/data/FlowBiteSvelteLineChartOptions'
    import type { TFlowBiteSvelteButton } from './TS/FlowBiteSvelteButton'
    import type { TCell } from "./TS/FlowBiteSvelteTable";
    import type { TTab } from "./TS/FlowBiteSvelteTab";
    import type { FlowBiteSvelteLineChart } from './TS/FlowBiteSvelteLineChart/FlowBiteSvelteLineChart'
    import { currentTime } from "./TS/FlowBiteSvelteLineChart/data/FlowBiteSvelteLineChartOptions";

    export let buttonProps: TFlowBiteSvelteButton[];
    export let tableHeaders: TCell[];
    export let tabs: TTab[];
    export let tabItemStyleStr: string;

    export let host;
    export let term;
    export let isStreamStart;
    export let isShowAllData;

    let chart: ChartJS;
    let flowBiteLineChart: FlowBiteSvelteLineChart;
    let chartData: ChartData = new ChartData();
    let lengendTableBodyData: TOntuneData[] = chartData.ontuneData;
    let chartJSData = chartData.chartData;
    let chartCanvas: HTMLCanvasElement;
    let fps;
    let frame;
    let worker: Worker;

    let test = 1;
    function clickTest(count){
        console.log('clickTest');
        // 라인하나 추가하기

        // legend 강제로 하나 추가 하기
        for(let i=0; i<count; ++i){
            // dataUtil.addDataSet( data.datasets );
            chartJSData.datasets.push({
                label: 'pc' + test,
                fill: true,
                borderColor: `rgb(${randomColorFactor()}, ${randomColorFactor()}, ${randomColorFactor()})`,
                data: [1,2,3,4,5,6,7,8,9,10],
                radius: 0
            });
            test = test+1;

            lengendTableBodyData.push(
                {
                    pcName: 'pc'+test,
                    value: 50,
                    date: '2022-05-23 13:45:31',
                    valueArr: [20], 
                    valueTotal: 20, 
                    valueAvg: 20,
                    maxValue: 20, 
                    maxDate: '2022-05-23 13:45:31'
                }
            )
        }
        chartJSData.datasets = chartJSData.datasets;
        lengendTableBodyData = lengendTableBodyData;
    }

    let isZoom = false;
    function noZoomAddRandomData(){
        isZoom = true;
        flowBiteLineChart.addRandomData(currentTime());
        let startTime = new Date()
        if(flowBiteLineChart.chart.data.labels.length > 10){
            while(flowBiteLineChart.chart.data.labels.length > 10){
                flowBiteLineChart.removeData();
            }
            chart.update()
        }
    }
    
    function onZoomAddRandomData(){
        let startTime = new Date();
        isZoom = false;
        flowBiteLineChart.addRandomData(currentTime());
        flowBiteLineChart.chart.options.plugins.zoom.pan.threshold = 10
        chart.update()
    }

    onMount(() => {
        const config = {type:'line', data: chartJSData, options: options};
        worker = new Worker(new URL('./TS/FlowBiteSvelteLineChartByOffScreen/offScreenWorker.js', import.meta.url), {type: 'module'});

        const canvas = chartCanvas.transferControlToOffscreen();

        const canvasContainer = document.getElementsByClassName('canvasContainer');
        const canvasContainerWidth = canvasContainer[0].clientWidth;
        const canvasContainerHeight = canvasContainer[0].clientHeight;
        const _config = JSON.stringify(config);
        worker.postMessage({canvas, _config, host, term, isStreamStart, isShowAllData, canvasContainerWidth, canvasContainerHeight}, [canvas]);
        worker.onmessage = function( event ){
            const { _fps, _frame } = event.data;
            fps = _fps;
        }
    });

    onDestroy(() => {
        chart = null;
        flowBiteLineChart = null;
        chartData = null;
        lengendTableBodyData = null;
        chartJSData = null;
        chartCanvas = null;
        fps = null;
        frame = null;
        worker = null;
    })
</script>

<div class="flow_bite_svelte_line_chart">
    <!-- <button style="border: 1px solid black;" on:click={() => { clickTest(10) }}>데이터 10개 추가</button>
    <button style="border: 1px solid black;" on:click={() => { clickTest(100) }}>데이터 100개 추가</button>
    <button style="border: 1px solid black;" on:click={() => { clickTest(1000) }}>데이터 1000개 추가</button> -->
    <div>fps : {fps}</div>
    <FlowBiteSvelteLayout
        size="xl"
        padding="md"
        styleStr="height: 600px; display: block;"
    >
        <div class="lineChartContainer">

            <!-- chart 영역 -->
            <div class="canvasContainer">
                <FlowBiteSvelteTab
                    tabs = {tabs}
                    tabItemStyleStr = {tabItemStyleStr}
                >
                    <!-- <div id="testContainer"></div> -->
                    <canvas bind:this={chartCanvas} id="myChart"></canvas>
                </FlowBiteSvelteTab>
            </div>

            <!-- 정보 및 기능 영역 -->
            <div class="optionContainer">

                <!-- 정보(레전드 및 데이터 표시) 영역 -->
                <div id="legend-container" class="optionContainer top">
                    <FlowBiteSvelteTable
                        bodys = {lengendTableBodyData}
                        headers = {tableHeaders}
                        styleStr = "padding: 3px;"
                        tableWidth = "w-full"             
                        tableHeight = "h-full"
                    >
                    </FlowBiteSvelteTable>
                </div>

                <!-- 기능 영역 -->
                <div class="optionContainer bottom">
                    {#each buttonProps as buttonProp, i}
                        <FlowBiteSvelteButton
                            color="{buttonProp.color}"
                            size="{buttonProp.size}"
                            width="{buttonProp.width}"
                            height="{buttonProp.height}"
                            styleStr="{buttonProp.styleStr}"
                            svgClass="{buttonProp.svgClass}"
                            svg_d="{buttonProp.svg_d}"
                            isSelected={buttonProp.isSelected}
                            on:onButtonClick={
                                () => {
                                    flowBiteLineChart.clickZoomButton( i, buttonProp );
                                    isZoom ? flowBiteLineChart.setDataInterval( 1000, onZoomAddRandomData ) : flowBiteLineChart.setDataInterval( 1000, noZoomAddRandomData );
                                    isZoom ? chart.zoom( 0.7 ) : chart.zoom( 1.0 )
                                }
                            }
                        >
                        </FlowBiteSvelteButton>
                    {/each}
                </div>
            </div>
        </div>
    </FlowBiteSvelteLayout>
</div>

<style>
    .lineChartContainer {
        display: flex;
        width: 100%;
        height: 100%;
    }
    
    .canvasContainer {
        width: 70%;
        margin-right: 30px;
        display: inline-block;
    }
    
    .optionContainer {
        width: 30%;
        display: inline-block;
    }

    .optionContainer .top {
        width: 100%;
        height: 70%;
    }

    .optionContainer .bottom {
        width: 100%;
        height: 30%;
        padding-top: 15px;
    }
</style>