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
    import { 
        Chart as ChartJS
        , Title
        , Tooltip
        , Legend
        , LineElement
        , LinearScale
        , PointElement
        , CategoryScale
        , TimeScale
        , LineController
        , Filler
        , type ChartConfiguration,
        type ChartTypeRegistry
    } from 'chart.js'
    // import 'chartjs-adapter-moment'
    import zoomPlugin from 'chartjs-plugin-zoom'
    import { ChartData, chartDummyData, chartLegendData, ontuneDummyData, type TOntuneData } from './TS/FlowBiteSvelteLineChart/data/FlowBiteSvelteLineChartData'
    import { currentTimeBeforSecond, data, dataUtil, options, randomColorFactor, zoomOption, } from './TS/FlowBiteSvelteLineChart/data/FlowBiteSvelteLineChartOptions'
    import type { TFlowBiteSvelteButton } from './TS/FlowBiteSvelteButton'
    import type { TCell } from "./TS/FlowBiteSvelteTable";
    import { TCellTHeadDummyData } from "./TS/FlowBiteSvelteTable";
    import type { TTab } from "./TS/FlowBiteSvelteTab";
    import { FlowBiteSvelteLineChart } from './TS/FlowBiteSvelteLineChart/FlowBiteSvelteLineChart'
    import { currentTime } from "./TS/FlowBiteSvelteLineChart/data/FlowBiteSvelteLineChartOptions";

    export let buttonProps: TFlowBiteSvelteButton[];
    export let tableHeaders: TCell[];
    export let tabs: TTab[];
    export let tabItemStyleStr: string;

    export let host;
    export let term;
    export let isStreamStart;
    export let isShowAllData;
    
    ChartJS.register(
        Title
        , Tooltip
        , Legend
        , LineElement
        , LinearScale
        , PointElement
        , CategoryScale
        , TimeScale
        , zoomPlugin
        , LineController
        , Filler
    );

    let chart: ChartJS;
    let flowBiteLineChart: FlowBiteSvelteLineChart;
    let chartData: ChartData = new ChartData();
    // chartData.setDatas( ontuneDummyData, chartDummyData, chartLegendData );
    let lengendTableBodyData: TOntuneData[] = chartData.ontuneData;
    let chartJSData = chartData.chartData;
    let chartCanvas: HTMLCanvasElement;

    let today = new Date();
    let year = today.getFullYear();
    let month = addZero(today.getMonth()+1);
    let day = addZero(today.getDate());
    let fullDate = `${year}-${month}-${day}`;
    let minYCount = 10;

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
        // chartJSData.datasets = chartJSData.datasets;
        lengendTableBodyData = lengendTableBodyData;
    };

    let isZoom = false;
    // const worker = new Worker(new URL('./TS/FlowBiteSvelteLineChart/lineChartWorker.js', import.meta.url), {type: 'module'});
    // worker.onmessage = function( event ){
    //     chartJSData = event.data;

    //     chart.update()
    // };
    
    function noZoomAddRandomData( config ){
        isZoom = true;
        flowBiteLineChart.addRandomData(currentTime());
        flowBiteLineChart.removeData();

        // const chartData = config.data;
        // const label = currentTime();
        // worker.postMessage({chartData, label});

        if( !isShowAllData ){
            config.options.scales.x.min = config.data.labels[config.data.labels.length - minYCount];
            config.options.scales.x.max = config.data.labels[config.data.labels.length-1];
        } else {
            delete options.scales.x.min;
            delete options.scales.x.max;
            delete options.scales.x.ticks.maxTicksLimit;
        };

        // update( chart, 'none' );
        chart.update('none');
    };

    function compare2Level(l1, l2) {
        return function(a, b) {
            return a[l1] === b[l1] ? a[l2] - b[l2] : a[l1] - b[l1];
        };
    }
    // function update( chart2: ChartJS, mode ){
    //     const config = chart2.config;
    //     config.update();
    //     const options = chart2._options = config.createResolver(config.chartOptionScopes(), chart.getContext());
    //     const animsDisabled = chart2._animationsDisabled = !options.animation;
    //     chart2._updateScales();
    //     chart2._checkEventBindings();
    //     chart2._updateHiddenIndices();
    //     chart2._plugins.invalidate();
    //     if (chart2.notifyPlugins('beforeUpdate', {
    //         mode,
    //         cancelable: true
    //     }) === false) {
    //         return;
    //     }
    //     const newControllers = chart2.buildOrUpdateControllers();
    //     chart2.notifyPlugins('beforeElementsUpdate');
    //     let minPadding = 0;
    //     for(let i = 0, ilen = chart2.data.datasets.length; i < ilen; i++){
    //         const { controller  } = chart2.getDatasetMeta(i);
    //         const reset = !animsDisabled && newControllers.indexOf(controller) === -1;
    //         controller.buildOrUpdateElements(reset);
    //         minPadding = Math.max(+controller.getMaxOverflow(), minPadding);
    //     }
    //     minPadding = chart2._minPadding = options.layout.autoPadding ? minPadding : 0;
    //     chart2._updateLayout(minPadding);
    //     if (!animsDisabled) {
    //         helpers_segment.each(newControllers, (controller)=>{
    //             controller.reset();
    //         });
    //     }
    //     chart2._updateDatasets(mode);
    //     chart2.notifyPlugins('afterUpdate', {
    //         mode
    //     });
    //     chart2._layers.sort(compare2Level('z', '_idx'));
    //     const { _active , _lastEvent  } = chart2;
    //     if (_lastEvent) {
    //         chart2._eventHandler(_lastEvent, true);
    //     } else if (_active.length) {
    //         chart2._updateHoverStyles(_active, _active, true);
    //     }
    //     chart2.render();
    // };
    
    function onZoomAddRandomData(){
        let startTime = new Date();
        isZoom = false;
        flowBiteLineChart.addRandomData(currentTime());
        flowBiteLineChart.chart.options.plugins.zoom.pan.threshold = 10
        // chart.update()
    };

    function addData( host, term, chartJSData ){
        // legend 강제로 하나 추가 하기
        for(let i=0; i<host; ++i){
            chartJSData.datasets.push({
                label: 'pc' + test,
                fill: false,
                borderColor: `rgb(${randomColorFactor()}, ${randomColorFactor()}, ${randomColorFactor()})`,
                data: [],
                radius: 0,
                borderWidth: 1,
                tension: false,
                stepped: 0,
                borderDash: [],
                minRotation: 0,
                maxRotation: 0,
            });
            test++;
        };

        let startTime = new Date(new Date().getTime() - (term*1000)).getTime();
        for(let i=1; i<=term; ++i){
            let timeStr = '';
            let tempDate = new Date(startTime + (i*1000));
            let hour = addZero( tempDate.getHours() );
            let min = addZero( tempDate.getMinutes() );
            let sec = addZero( tempDate.getSeconds() );
            
            timeStr = `${fullDate} ${hour}:${min}:${sec}`;

            chartJSData.labels.push(timeStr);

            for( let j=0; j<host; ++j ){
                chartJSData.datasets[j].data.push(parseInt((Math.random() * 100).toString()));
            };
        };

        console.log('chartJSData at addData', chartJSData);
    };

    function addZero( time ){
        if( time < 10 ){
            time = '0' + time;
        };
        return time;
    };

    onMount(() => {
        const canvasContainer = document.getElementsByClassName('canvasContainer');
        const canvasContainerWidth = canvasContainer[0].clientWidth;
        const canvasContainerHeight = canvasContainer[0].clientHeight;
        const config: ChartConfiguration = {type:'line', data: chartJSData, options: options};
        delete config.options.scales.x.type;

        addData(host, term, chartJSData);

        if( !isShowAllData ){
            options.scales.x.min = chartJSData.labels[chartJSData.labels.length - minYCount].toString();
            options.scales.x.max = chartJSData.labels[chartJSData.labels.length-1].toString();
            // options.scales.x.ticks.maxTicksLimit = 20;
        } else {
            delete options.scales.x.min;
            delete options.scales.x.max;
            delete options.scales.x.ticks.maxTicksLimit;
        };

        chartCanvas.width = canvasContainerWidth;
        chartCanvas.height = canvasContainerHeight-70;
        chart = new ChartJS(chartCanvas, config);
        console.log('chart', chart);

        chart.resize();

        if( !isStreamStart ){
            return;
        };

        zoomOption.pan.enabled = !zoomOption.pan.enabled;

        flowBiteLineChart = new FlowBiteSvelteLineChart( chart, options, zoomOption );
        flowBiteLineChart.setData( chartData );

        flowBiteLineChart.setDataInterval( 1000, noZoomAddRandomData );
        flowBiteLineChart.startDataInterval( config );
    });

    onDestroy(() => {
        // chart.destroy();
        chart = null;
        flowBiteLineChart = null;
        chartData = null;
        lengendTableBodyData = null;
        chartJSData = null;
        chartCanvas = null;
        today = null;
        year = null;
        month = null;
        day = null;
        fullDate = null;
    });
</script>

<div class="flow_bite_svelte_line_chart">
    <!-- <button style="border: 1px solid black;" on:click={() => { clickTest(10) }}>데이터 10개 추가</button>
    <button style="border: 1px solid black;" on:click={() => { clickTest(100) }}>데이터 100개 추가</button>
    <button style="border: 1px solid black;" on:click={() => { clickTest(1000) }}>데이터 1000개 추가</button> -->
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