import type { ChartOptions } from "chart.js";

export class OntuneChartOptions {
    options: ChartOptions;

    constructor( options: ChartOptions ){
        this.options = options;
    };
};