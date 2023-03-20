import {
    Chart as ChartJS
    , type ChartConfiguration
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
    , BarElement
    , BarController
} from 'chart.js';
import { OntuneChartConfig } from './OntuneChartConfig';
import type { OntuneChartData } from './OntuneChartData';
import type { OntuneChartOptions } from './OntuneChartOptions/OntuneChartOptions';

ChartJS.register(
    Title
    , Tooltip
    , Legend
    , LineElement
    , LinearScale
    , PointElement
    , CategoryScale
    , TimeScale
    , LineController
    , Filler
    , BarElement
    , BarController
);

export class OntuneChart {
    chart: ChartJS;
    ontuneChartConfig: OntuneChartConfig;

    
    constructor( canvas: HTMLCanvasElement, config: ChartConfiguration ){
        this.ontuneChartConfig = new OntuneChartConfig( config );
        this.chart = new ChartJS( canvas, config );

        this.chart.resize();
    };
};