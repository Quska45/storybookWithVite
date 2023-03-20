// const window = globalThis;
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
} from 'chart.js'
import 'chartjs-adapter-moment'
import { compute_rest_props } from 'svelte/internal';
// import zoomPlugin from 'chartjs-plugin-zoom'
import { ChartData } from '../FlowBiteSvelteLineChart/data/FlowBiteSvelteLineChartData';
import { currentTime, randomColorFactor, zoomOption } from "../FlowBiteSvelteLineChart/data/FlowBiteSvelteLineChartOptions";
import { FlowBiteSvelteLineChart } from "../FlowBiteSvelteLineChart/FlowBiteSvelteLineChart";

ChartJS.register(
    Title
    , Tooltip
    , Legend
    , LineElement
    , LinearScale
    , PointElement
    , CategoryScale
    , TimeScale
    // , zoomPlugin
    , LineController
    , Filler
);

let test = 1;

let today = new Date();
let year = today.getFullYear();
let month = addZero(today.getMonth()+1);
let day = addZero(today.getDate());
let fullDate = `${year}-${month}-${day}`;

let startTime2 = performance.now();
let frameCount = 0;
let fps = 0;

function addData( host, term, chartJSData ){
    // legend 강제로 하나 추가 하기
    for(let i=0; i<host; ++i){
        chartJSData.datasets.push({
            label: 'pc' + test,
            fill: false,
            borderColor: `rgb(${randomColorFactor()}, ${randomColorFactor()}, ${randomColorFactor()})`,
            data: [],
            radius: 0,
            borderWidth: 1
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
            chartJSData.datasets[j].data.push(parseInt(Math.random() * 100));
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

const window = self;
onmessage = function( event ){
    let chartData = new ChartData();
    const {canvas, _config, host, term, isStreamStart, isShowAllData, canvasContainerWidth, canvasContainerHeight} = event.data;
    // const canvas = JSON.parse(_canvas);
    const config = JSON.parse(_config);
    delete config.options.scales.x.type;
    
    addData(host, term, config.data);
    
    if( !isShowAllData ){
        config.options.scales.x.min = config.data.labels[config.data.labels.length-10];
        config.options.scales.x.max = config.data.labels[config.data.labels.length-1];
        config.options.scales.x.ticks.maxTicksLimit = 20;
    } else {
        delete options.scales.x.min;
        delete options.scales.x.max;
        delete options.scales.x.ticks.maxTicksLimit;
    };
    canvas.width = canvasContainerWidth;
    canvas.height = canvasContainerHeight-70;
    let loadStartTime = this.performance.now();
    const chart = new ChartJS(canvas, config);
    console.log('(performance.now() - loadStartTime)/1000', (performance.now() - loadStartTime)/1000);

    function noZoomAddRandomData(){
        flowBiteLineChart.addRandomData(currentTime());
        flowBiteLineChart.removeData();
        if( !isShowAllData ){
            config.options.scales.x.min = config.data.labels[config.data.labels.length-10];
            config.options.scales.x.max = config.data.labels[config.data.labels.length-1];
        } else {
            delete options.scales.x.min;
            delete options.scales.x.max;
            delete options.scales.x.ticks.maxTicksLimit;
        };
        chart.update()
    };

    chart.resize();

    // Update the chart
    function updateChart() {
        // Your chart update code here...

        // Measure FPS
        frameCount++;
        const elapsedTime = performance.now() - startTime2;
        if (elapsedTime > 1000) {
            fps = Math.round(frameCount / (elapsedTime / 1000));
            postMessage({_fps: fps, _frame: (elapsedTime / 1000)});
            frameCount = 0;
            startTime2 = performance.now();
        }

        // Request next animation frame
        requestAnimationFrame(updateChart);
    }
    // Start the animation loop
    requestAnimationFrame(updateChart);

    if( !isStreamStart ){
        return;
    };

    const flowBiteLineChart = new FlowBiteSvelteLineChart( chart, config.options, {} );
    flowBiteLineChart.setData( chartData );

    flowBiteLineChart.setDataInterval( 1000, noZoomAddRandomData );
    flowBiteLineChart.startDataInterval();
};