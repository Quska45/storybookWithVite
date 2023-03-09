// import type { Chart } from "chart.js";
import { LineChart } from "../../../../stories/TS/LineChart/LineChart";
import type { ChartData } from "./data/FlowBiteSvelteLineChartData";
import type { Chart } from 'svelte-chartjs'
// import type { Chart } from "chart.js";
import { FlowBiteSvelteLineChartEvent } from "./Event";
import { FlowBiteDataInterval } from "./FlowBiteSvelteInterval";

export function getRandomIntInclusive( min, max ) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export class FlowBiteSvelteLineChart{
    chart: Chart;
    option;
    zoomOption;
    event: FlowBiteSvelteLineChartEvent;
    dataInterval: FlowBiteDataInterval;
    data: ChartData;

    constructor( chart, option, zoomOption ){
        this.chart = chart;
        this.option = option;
        this.zoomOption = zoomOption;
        this.event = new FlowBiteSvelteLineChartEvent( chart, option, zoomOption );
        this.dataInterval = new FlowBiteDataInterval();
    };

    setData( data: ChartData ){
        this.data = data;
    }

    addData( label, data ) {
        let chart = this;
        chart.chart.data.labels.push(label);
        chart.chart.data.datasets.forEach((dataset, i) => {
            dataset.data.push(data + i);
        });
        chart.chart.update();
    };
    
    addRandomData( label ) {
        let chart = this;
        chart.chart.data.labels.push(label);
        chart.chart.data.datasets.forEach((dataset, i) => {
            dataset.data.push(getRandomIntInclusive(0,100));
        });
        // chart.chart.update();
    };

    addRandomData2( label ) {
        let chart = this;
        chart.chart.data.labels.push(label);
        let randomValue = getRandomIntInclusive(0,100);
        let randomValues = []

        // chart.data.ontuneData에 데이터 추가
        chart.data.ontuneData.forEach(( cur ) => {
            let value = getRandomIntInclusive(0,100);
            cur.value = value;
            randomValues.push( value );
        })

        // chart.data.chartData에 데이터 추가
        chart.data.chartData.datasets.forEach((dataset, i) => {
            dataset.data.push(randomValues[i]);
        });

        // chart.data.chartLegendData에 데이터 추가
        chart.data.chartLegendData
        chart.chart.update();
    };
    
    removeData() {
        let chart = this;
        chart.chart.data.labels.shift();
        chart.chart.data.datasets.forEach((dataset) => {
            dataset.data.shift();
        });
    }

    zoomReset(){
        let chart = this;
        
        chart.chart.zoom(1.0);
        chart.chart.resetZoom();
    }

    clickZoomButton( index: number, buttonProp ){
        let chart = this;

        chart.event.triggerButtonEventByButtonIndex( index,buttonProp );
        chart.zoomReset();
    }

    
    setDataInterval( intervalTime: number, intervalFunction ){
        let chart = this;

        chart.dataInterval.set( intervalTime, intervalFunction );
    }

    /**
     * intervalStart에 인자로 들어오는 모든 값은 chart.dataInterval.startFunction 안에서 실행되는 콜백의 인자로 들어간다.
    */
    startDataInterval( arg ){
        let chart = this;

        chart.dataInterval.startFunction.apply( chart.dataInterval, arguments );
    }
}