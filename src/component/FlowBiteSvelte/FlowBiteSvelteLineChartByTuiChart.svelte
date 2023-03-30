<script lang="ts">
    import "flowbite/dist/flowbite.css";
    import { onMount } from 'svelte'
    import FlowBiteSvelteLayout from './FlowBiteSvelteLayout.svelte'
    import FlowBiteSvelteButton from './FlowBiteSvelteButton.svelte'
    import FlowBiteSvelteTab from './FlowBiteSvelteTab.svelte'
    import FlowBiteSvelteTable from './FlowBiteSvelteTable.svelte'
    import { ChartData, chartDummyData, chartLegendData, D3ChartData, ontuneDummyData, type TOntuneData } from './TS/FlowBiteSvelteLineChart/data/FlowBiteSvelteLineChartData'
    import type { TFlowBiteSvelteButton } from './TS/FlowBiteSvelteButton'
    import type { TCell } from "./TS/FlowBiteSvelteTable";
    import type { TTab } from "./TS/FlowBiteSvelteTab";
    import Chart, { type LineChartOptions } from '@toast-ui/chart';
    import type { Options } from "@toast-ui/chart/types/store/store";

    // 차트외의 props
    export let buttonProps: TFlowBiteSvelteButton[];
    export let tableHeaders: TCell[];
    export let tabs: TTab[];
    export let tabItemStyleStr: string;

    // props로 받아야할 목록
    let myChart: HTMLElement;
    const chartData: D3ChartData = new D3ChartData();
    let lengendTableBodyData: TOntuneData[] = chartData.ontuneData;
    

    export let host;
    export let term; //시간(s)
    export let isStreamStart;

    let hostArr = [];

    let fn_start;
    let fn_stop;
    let resize;

    onMount(() => {
        let term = 10;
        let host = 10;
        let categories = [];
        let series = [];

        for( let i=0; i<term; ++i ){
            categories.push( term );
        
        };

        for( let i=0; i<host; ++i ){
            series.push({});
            series[ i ].name = i.toFixed();
            series[ i ].data = [];
            for( let j=0; j<term; ++j ){
                series[ i ].data.push( Math.random()*100 );
            };
        }

        console.log(categories);
        console.log(series);

        const el = document.getElementById('myChart');
        const data = {
            // categories: ['1', '2', '3', '4', '5'],
            // series: [
            //     {
            //     name: 'A',
            //     data: [10, 100, 50, 40, 70],
            //     },
            //     {
            //     name: 'B',
            //     data: [60, 40, 10, 33, 70],
            //     },
            // ],
            categories: categories,
            series: series
        };
        const options: LineChartOptions = {
                chart: { 
                    title: '24-hr Average Temperature', 
                    width: 500, 
                    height: 300,
                    animation: false
                },
                xAxis: {
                    title: 'Month',
                },
                yAxis: {
                    title: 'Amount',
                },
                tooltip: {
                    formatter: (value) => `${value}°C`,
                },
                legend: {
                    align: 'bottom',
                    visible: false,
                },
                series: {
                    shift: true, //false 이면 데이터가 쌓인다.
                    spline:true,
                },
                responsive: {
                    animation: false
                }
                
        };
        const lineChart = Chart.lineChart({ el, data, options });
        let index = data.categories.length + 1;

        function fn_addData(){
            let seriesData = [];
            for( let i=0; i<host; ++i ){
                seriesData.push( Math.round(Math.random()*100) );
            };

            // const random = Math.round(Math.random()*100);
            // const random2 = Math.round(Math.random()*100);
            // lineChart.addData([random, random2], index.toString());
            lineChart.addData(seriesData, index.toString());
            index += 1;
        }
        let intervalId = null;
        fn_start = function fn_start(){
            intervalId = setInterval(fn_addData, 1000);
        }
        fn_stop = function fn_stop(){
            clearInterval(intervalId);
        }
        resize = function resize(){
            lineChart.resize({width: Math.round(Math.random()*300)+300});
        }

        if( !isStreamStart ){
            return;
        };

        // setInterval(function(){
            
        // }, 1000);

    });

</script>

<div class="flow_bite_svelte_line_chart">
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
                <button on:click={fn_start}>start addData</button>
                <button on:click={fn_stop}>stop addData</button>
                <button on:click={resize}>resize</button>
                <div id="myChart" bind:this={myChart}></div>
                </FlowBiteSvelteTab>
            </div>

            <!-- 정보 및 기능 영역 -->
            <div class="optionContainer">

                <!-- 정보(레전드 및 데이터 표시) 영역 -->
                <div id="legend-container" class="optionContainer top">
                    <FlowBiteSvelteTable
                        bodys = {lengendTableBodyData}
                        headers = {tableHeaders}
                        styleStr = "padding: 3px"
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
                                    console.log('FlowBiteSvelteButton click');
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