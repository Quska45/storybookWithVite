import type { ChartConfiguration, ChartData, ChartOptions, ChartType, Plugin } from "chart.js";
import { OntuneChartData } from "./OntuneChartData";
import { OntuneChartOptions } from "./OntuneChartOptions/OntuneChartOptions";

export class OntuneChartConfig {
    config: ChartConfiguration;

    ontuneChartData: OntuneChartData;
    ontuneChartOptions: OntuneChartOptions;

    constructor( config: ChartConfiguration ){
        this.config = config;

        this.ontuneChartData = new OntuneChartData( config.data );
        this.ontuneChartOptions = new OntuneChartOptions( config.options );
    };

    getConfig(){
        return this.config;
    };

};