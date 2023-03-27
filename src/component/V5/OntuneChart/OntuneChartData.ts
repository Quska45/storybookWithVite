import type { ChartData, ChartDataset } from "chart.js";

export class OntuneChartData implements ChartData {
    labels?: unknown[];
    datasets: ChartDataset[];
    dataIndex: number;

    constructor( data: ChartData ){
        data ? this.labels = data.labels : [];
        data ? this.datasets = data.datasets : [];
    };

    static setAllDataByLineWidth( data: ChartData, lineWidth: number ){
        data.datasets.forEach(( cur ) => {
            cur.borderWidth = lineWidth;
        });
    };
};