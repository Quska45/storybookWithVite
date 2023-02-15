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
    import * as d3 from 'd3';
    import { FlowBiteSvelteLineChartByD3 } from "./TS/FlowBiteSvelteLineChartByD3/FlowBiteSvelteLineChartByD3";
    import { init } from "svelte/internal";
    import { seriesCanvasLine } from "d3fc"

    export let buttonProps: TFlowBiteSvelteButton[];
    export let tableHeaders: TCell[];
    export let tabs: TTab[];
    export let tabItemStyleStr: string;

    
    function clickTest(){
        console.log('clickTest click');
    }

    let vis: HTMLElement;
    const chartData: D3ChartData = new D3ChartData();
    let lengendTableBodyData: TOntuneData[] = chartData.ontuneData;
    
    for (let i = 0; i < 100; ++i) {
        chartData.chartData.push({x: Math.random() * 10, y: Math.random() * 10})
    }

    onMount(() => {
        const lineChart = new FlowBiteSvelteLineChartByD3( vis, {min:0, max:10 }, {min:0, max:10 }, chartData );
        lineChart.init();
        lineChart.draw();
        window.addEventListener('resize', lineChart.draw);

        let test2 = d3.range(0,50).map(d=>Math.random())
        let test = seriesCanvasLine()
        console.log(123);
    })
</script>

<div class="flow_bite_svelte_line_chart">
    <button style="border: 1px solid black;" on:click={() => { clickTest() }}>데이터 10개 추가</button>
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
                <div id="vis" bind:this={vis}></div>
                <canvas id="canvasContainer" width="960" height="500"></canvas>
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

    #vis {
		width: 100%;
		height: 100%;
		background-color: whitesmoke;
	}
	
	circle {
		fill: black;
		fill-opacity: 0.5;
	}
</style>