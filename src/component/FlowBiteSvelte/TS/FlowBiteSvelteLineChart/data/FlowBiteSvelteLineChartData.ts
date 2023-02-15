import type { LegendItem } from "chart.js"
import type { TVector } from "../../FlowBiteSvelteLineChartByD3/ChartByD3Type";
import { currentTimeBeforSecond } from "./FlowBiteSvelteLineChartOptions";

export type TOntuneData = {
  pcName: string,
  value: number,
  date: string,
  valueArr?: number[], // 현재까지 수신된 pcName에 대한 모든 데이터
  valueTotal?: number, // 현재까지 수신된 pcName에 대한 모든 데이터의 합
  valueAvg?: number, // 현재까지 수신된 pcName에 대한 모든 데이터의 평균 값
  maxValue?: number, // 현재까지 수신된 pcName에 대한 모든 데이터 중 최대 값
  maxDate?: string, // 현재까지 수신된 pcName에 대한 모든 데이터 중 최대 값이 수신된 시간
}

export type TChartDataSet = {
  label: string,
  fill: boolean,
  borderColor: string,
  data: number[]
}

export type TChartData = import("chart.js").ChartData<keyof import("chart.js").ChartTypeRegistry, (number | [number, number] | import("chart.js").Point | import("chart.js").BubbleDataPoint)[], unknown>;
// {
//   labels: string[],
//   datasets: TChartDataSet[]
// }

export type TChartLegendData = TOntuneData & {
  item: LegendItem
}

export class ChartData {
  ontuneData: TOntuneData[] = [];
  chartData: TChartData = {labels: [], datasets: []};
  chartLegendData: TChartLegendData[] = [];

  constructor(){
  }

  setDatas( ontuneData: TOntuneData[], chartData: TChartData, chartLegendData: TChartLegendData[] ){
    this.ontuneData = ontuneData;
    this.chartData = chartData;
    this.chartLegendData = chartLegendData;
  }
  
  setOntuneData( ontuneData: TOntuneData[] ){
    this.ontuneData = ontuneData;
  }

  setChartData( chartData: TChartData ){
    this.chartData = chartData;
  }

  setChartLegendData( chartLegendData: TChartLegendData[] ){
    this.chartLegendData = chartLegendData;
  }
}

export class D3ChartData{
  ontuneData: TOntuneData[] = [];
  chartData: TVector[] = [];
  chartLegendData: TChartLegendData[] = [];

  constructor(){
  }

  setOntuneData( ontuneData: TOntuneData[] ){
    this.ontuneData = ontuneData;
  }

  setChartData( chartData: TVector[] ){
    this.chartData = chartData;
  }

  setChartLegendData( chartLegendData: TChartLegendData[] ){
    this.chartLegendData = chartLegendData;
  }
}

export const ontuneDummyData: TOntuneData[] = [
  // {
  //   pcName: 'pc1',
  //   value: 50,
  //   date: '2022-05-23 13:45:31',
  //   valueArr: [20], 
  //   valueTotal: 20, 
  //   valueAvg: 20,
  //   maxValue: 20, 
  //   maxDate: '2022-05-23 13:45:31',
  // }
];

export const chartDummyData: TChartData = {
  labels: [
    currentTimeBeforSecond(1000)
    , currentTimeBeforSecond(900)
    , currentTimeBeforSecond(800)
    , currentTimeBeforSecond(700)
    , currentTimeBeforSecond(600)
    , currentTimeBeforSecond(500)
    , currentTimeBeforSecond(400)
    , currentTimeBeforSecond(300)
    , currentTimeBeforSecond(200)
    , currentTimeBeforSecond(100)
  ],
  datasets: []
};

export const chartLegendData: TChartLegendData[] = [
  // {
  //   pcName: 'pc1',
  //   value: 50,
  //   date: '2022-05-23 13:45:31',
  //   valueArr: [20], 
  //   valueTotal: 20, 
  //   valueAvg: 20,
  //   maxValue: 20, 
  //   maxDate: '2022-05-23 13:45:31',
  //   item: null
  // }
];