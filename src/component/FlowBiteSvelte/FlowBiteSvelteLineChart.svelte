<script lang="ts">
    import "flowbite/dist/flowbite.css";
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
    } from 'chart.js'
    import 'chartjs-adapter-moment'
    import zoomPlugin from 'chartjs-plugin-zoom'
    import { data, options, zoomOption } from './TS/FlowBiteSvelteLineChart/FlowBiteSvelteLineChartData'
    import type { TFlowBiteSvelteButton } from './TS/FlowBiteSvelteButton'
    import type { TCell } from "./TS/FlowBiteSvelteTable";
    import type { TTab } from "./TS/FlowBiteSvelteTab";
    import { 
        addData
        , addRandomData
        , removeData
        , getRandomIntInclusive
        , currentTime
        , zoom
    } from './TS/FlowBiteSvelteLineChart/FlowBiteSvelteLineChart'

    export let buttonProps: TFlowBiteSvelteButton[];
    export let headers: TCell[];
    export let bodys: [TCell[]];
    export let tabs: TTab[];

    let chart;
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
    );

    function chartEventTest(){
        console.log( 'chartEventTest' );
        console.log('chart.options',chart.options);
        console.log('chart.options.plugins', chart.options.plugins);

        // chart.options = zoomOption;
        console.log(chart.config);
        console.log(chart.config.plugins);
        // chart.config._config.options.plugins.zoom.zoom.wheel.enabled = true
        // chart.options.plugins = zoomOption;
        // options.plugins.zoom.zoom.wheel.enabled = true;
        // options.plugins.zoom.zoom.pinch.enabled = true;
        // options.plugins.zoom.zoom.mode = "xy";
        // options.plugins.zoom.pan.enabled = true;
        // chart.options.plugins = zoomOption
        // chart.options.plugins.set()
        // console.log('chart.options.plugins2',chart.options.plugins);
        chart.update()
    }
</script>

<div class="flow_bite_svelte_line_chart">
    <button style="border: 1px solid black;" on:click={() => { addRandomData(chart, currentTime()) }}>data add</button>
    <button style="border: 1px solid black;" on:click={() => { removeData(chart) }}>data remove</button>
    <button style="border: 1px solid black;" on:click={() => { zoom.reset(chart) }}>zoom reset</button>
    <button style="border: 1px solid black;" on:click={chartEventTest}>test click</button>
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
                >
                    <Chart width={100} height={470} bind:chart type="line" {data} {options} />
                    <!-- <Line bind:line on:click={testLineClick} {data} {options} /> -->
                </FlowBiteSvelteTab>
            </div>

            <!-- 정보 및 기능 영역 -->
            <div class="optionContainer">

                <!-- 정보(레전드 및 데이터 표시) 영역 -->
                <div class="optionContainer top">
                    <FlowBiteSvelteTable
                        bodys = {bodys}
                        headers = {headers}
                        styleStr = "padding: 3px"
                        tableWidth = "w-full"             
                        tableHeight = "h-full"
                    >
                    </FlowBiteSvelteTable>
                </div>

                <!-- 기능 영역 -->
                <div class="optionContainer bottom">
                    {#each buttonProps as buttonProp}
                        <FlowBiteSvelteButton
                            color="{buttonProp.color}"
                            size="{buttonProp.size}"
                            width="{buttonProp.width}"
                            height="{buttonProp.height}"
                            styleStr="{buttonProp.styleStr}"
                            svgClass="{buttonProp.svgClass}"
                            svg_d="{buttonProp.svg_d}"
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
        /* border: 1px solid black; */
    }
    
    .optionContainer {
        width: 30%;
        display: inline-block;
        /* border: 1px solid black; */
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