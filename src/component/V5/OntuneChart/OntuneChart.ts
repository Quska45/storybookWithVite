import {
    Chart as ChartJS,
    type ChartConfiguration,
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
    TimeScale,
    LineController,
    Filler,
    BarElement,
    BarController,
    type LayoutPosition,
    type ChartData,
    LogarithmicScale,
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom'
import {} from 'chartjs-adapter-moment'
import { OntuneChartConfig } from './OntuneChartConfig';
import type { TLengendOptions } from './OntuneChartType';
import { OntuneLegend } from './OntuneLegend/OntuneLegend';

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
    TimeScale,
    LineController,
    Filler,
    BarElement,
    BarController,
    zoomPlugin,
    LogarithmicScale,
);

export class OntuneChart {
    chart: ChartJS;
    ontuneChartConfig: OntuneChartConfig;
    ontuneLegend: OntuneLegend;

    
    constructor( canvas: HTMLCanvasElement, config: ChartConfiguration ){
        this.ontuneChartConfig = new OntuneChartConfig( config );
        this.chart = new ChartJS( canvas, config );
        this.ontuneLegend = new OntuneLegend( this.chart.legend );

        this.chart.resize();
    };

    makeLegend( id: string, legendOptions: TLengendOptions ){
        this.ontuneLegend.makeLegend( this.chart, id, legendOptions );
    };

    resetZoom(){
        this.chart.resetZoom();
    };
};