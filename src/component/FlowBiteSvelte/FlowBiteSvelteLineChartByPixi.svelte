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
    import * as PIXI from 'pixi.js';
    import { PixiLineChart } from "./TS/FlowBiteSvelteLineChartByPIXI/PixiLineChart/API/PixiLineChart";
    import { ContainerManager } from "./TS/FlowBiteSvelteLineChartByPIXI/PixiLineChart/Container/ContainerManager";
    import type { ContainerOptions } from "./TS/FlowBiteSvelteLineChartByPIXI/PixiLineChart/Container/Container";

    export let buttonProps: TFlowBiteSvelteButton[];
    export let tableHeaders: TCell[];
    export let tabs: TTab[];
    export let tabItemStyleStr: string;

    
    function clickTest(){
        console.log('clickTest click');
    }

    // props로 받아야할 목록
    let resizeToSelector = '#pixiContainer';
    let pixiOptions;
    let xAxesContainerOption: ContainerOptions = {
        margin: 10,
        width: 0,
        height: 0,
        x: 0,
        y: 0
    };
    let yAxesContainerOption: ContainerOptions = {
        margin: 10,
        width: 0,
        height: 0,
        x: 0,
        y: 0
    };
    let chartMainContainerOption: ContainerOptions = {
        margin: 10,
        width: 0,
        height: 0,
        x: 0,
        y: 0
    };


    let pixiContainer: HTMLElement;
    let pixiContainerInfo;
    let pixiApp: PIXI.Application;
    let pixiChart: PixiLineChart;
    let containerManager: ContainerManager;
    let canvas: HTMLCanvasElement;
    const chartData: D3ChartData = new D3ChartData();
    let lengendTableBodyData: TOntuneData[] = chartData.ontuneData;
    

    onMount(() => {
        // pixi 인스턴스 생성
        pixiOptions = {
            resizeTo: (document.querySelector(resizeToSelector) as HTMLElement),
            background: '#ffffff'
        };
        pixiApp = new PIXI.Application( pixiOptions );

        // 차트의 container 생성
        containerManager = new ContainerManager();

        // lineChart 인스턴스 생성
        pixiChart = new PixiLineChart( pixiApp, containerManager );
        pixiChart.attachBySelector( resizeToSelector );
        canvas = document.querySelector( 'canvas' );

        pixiContainerInfo = getRectSize(pixiContainer);

        // ETC
        const sprite1 = new PIXI.Sprite(PIXI.Texture.WHITE);
        sprite1.tint = 0xff0000
        sprite1.width = sprite1.height = 100
        sprite1.position.set(100, 100)
        pixiApp.stage.addChild(sprite1);
    })

    function getRectSize( dom: HTMLElement ){
        // 현재 컨테이너 크기 조회
        let rect = dom.getBoundingClientRect();
        let pl = parseFloat( dom.style.paddingLeft );
        let pr = parseFloat( dom.style.paddingRight );
        let pb = parseFloat( dom.style.paddingBottom );
        let pt = parseFloat( dom.style.paddingTop );
        
        if( isNaN( pl ) === false ){
            rect.width -= pl;
        }
        if( isNaN( pr ) === false ){
            rect.width -= pr;
        }
        if( isNaN( pb ) === false ){
            rect.height -= pb;
        }
        if( isNaN( pt ) === false ){
            rect.height -= pt;
        }
        
        return {
            width: rect.width,
            height: rect.height
        };
    }
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
                <div id="pixiContainer" bind:this={pixiContainer}></div>
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

    #pixiContainer {
		width: 100%;
		height: 100%;
		background-color: whitesmoke;
	}
</style>