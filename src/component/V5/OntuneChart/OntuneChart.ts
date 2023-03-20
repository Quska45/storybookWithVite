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
} from 'chart.js';

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
);

export class OntuneChart {
    chart: ChartJS;
    
    constructor( canvas: HTMLCanvasElement, config: ChartConfiguration ){
        this.chart = new ChartJS( canvas, config );

        this.chart.resize();
    };
};