import type { ChartData, ChartDataset } from "chart.js";

export class OntuneChartData implements ChartData {
    labels?: unknown[];
    datasets: ChartDataset[];

    constructor( data: ChartData ){
    };
};