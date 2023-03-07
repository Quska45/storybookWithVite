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
    import Plotly from 'plotly.js-basic-dist';
    import { getPlotlyXDummyData, getPlotlyYDummyData, randomColorFactor } from "./TS/FlowBiteSvelteLineChartByPlotly/PlotlyDummyData"; 

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
    let data = [];


    function rand(): number{
        return Math.random()*100;
    };

    const plotlyXData = getPlotlyXDummyData( term );
    for(let i=0; i<host; ++i){
        data.push({
            x: [...plotlyXData],
            y: getPlotlyYDummyData(term),
            type: 'scattergl',
            mode: 'lines',
            line: {
                color: `rgb(${randomColorFactor()}, ${randomColorFactor()}, ${randomColorFactor()})`,
                width: 1
            }
        })
    };
    
    const layout = {
        title: 'My Line Chart with WebGL',
        xaxis: {
            title: 'X-axis label',
            range: [1,10],
            nticks: 10
        },
        yaxis: {
            title: 'Y-axis label'
        },
        margin: {
            l: 50,
            r: 50,
            b: 50,
            t: 80
        },
        // dragmode: 'pan' // pan이 enable 된 상태로 시작되게 해줌
        // modebar: {
        //     orientation: 'v',
        // },
    };

    function addZero( time ){
        if( time < 10 ){
            time = '0' + time;
        };
        return time;
    };

    onMount(() => {
        Plotly.newPlot('myChart', data, layout);

        if( !isStreamStart ){
            return;
        };

        setInterval(function(){
            let date = new Date();
            let hour = addZero(date.getHours());
            let min = addZero(date.getMinutes());
            let sec = addZero(date.getSeconds());

            for(let i=0; i<host; ++i){
                data[i].x.shift()
                data[i].y.shift()
                data[i].x.push(`${hour}:${min}:${sec}`);
                data[i].y.push(Math.random()*100);
            };

            Plotly.redraw('myChart');
            
            // let yArr = [];
            // let yCountArr = [];
            // for(let i=0; i<count; ++i){
            //     yArr.push([rand()]);
            //     yCountArr.push(i);
            // };

            // console.log('변경 전',data[0]);
            // const worker = new Worker(new URL('./TS/FlowBiteSvelteLineChartByPlotly/AddDataWorker.js', import.meta.url), {type: 'module'});
            // worker.postMessage({data, count, layout});
            // console.log('변경 후',data);
            // worker.onmessage = function(event) {
                // console.log(data)
                // console.log('변경 후', event.data[0]);
                // console.log('Received message from worker evente:', event);
                // data = event.data;
                // Plotly.update('myChart', {}, event.data);
                // Plotly.update('myChart', event.data, {});
                // Plotly.redraw('myChart');
            // };

            // console.log('yArr', yArr);
            // console.log('yCountArr', yCountArr);
            // Plotly.extendTraces('myChart', {
            //     y: yArr
            // }, yCountArr);
        }, 1000);

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