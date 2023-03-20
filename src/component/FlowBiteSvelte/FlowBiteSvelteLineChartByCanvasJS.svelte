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
    import * as CanvasJS from './canvasjs.min.js';


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

    onMount(() => {
        for(let i=0; i<host; ++i){
            hostArr.push({
                type: "line",
                dataPoints: []
            });
        };

        let chart = new CanvasJS.Chart("myChart", {
            title :{
                text: "Dynamic Data"
            },
            axisY:{
                minimum: 0,
                maximum: 100,
            },
            data: hostArr
        });
        

        if( !isStreamStart ){
            return;
        };

        let xVal = 0;
        let yVal = 100; 
        let updateInterval = 1000;
        let dataLength = 10; // number of dataPoints visible at any point

        let updateChart = function () {

            for (let j = 0; j < hostArr.length; j++) {
                yVal = Math.random()*100;
                hostArr[j].dataPoints.push({
                    x: xVal,
                    y: yVal
                });
                xVal++;
            
            // console.log('hostArr[j].dataPoints', hostArr[j].dataPoints);
            
            if (hostArr[j].dataPoints.length > dataLength) {
            hostArr[j].dataPoints.shift();
            }
            }
        
        // console.log(hostArr);


            chart.render();
        };

        updateChart();
        setInterval(function(){updateChart()}, updateInterval);

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