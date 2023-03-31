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
    type Plugin,
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom'
import {} from 'chartjs-adapter-moment'
import { OntuneChartConfig } from './OntuneChartConfig';
import type { TLengendOptions } from './OntuneChartType';
import { OntuneLegend } from './OntuneLegend/OntuneLegend';
import { indicator } from './OntuneChartPlugins/indicator';

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
        this.ontuneLegend.make( this.chart, id, legendOptions );
    };

    resetZoom(){
        this.chart.resetZoom();
    };

    destroyLegend( id: string ){
        this.ontuneLegend.destroy( id );
    };

    destroy(){
        this.chart.destroy();
        this.ontuneChartConfig = null;
        this.ontuneLegend = null;
        this.chart = null;
    };

    addPlugin( plugin: Plugin ){
        ChartJS.register( plugin );
        this.chart.update();
    };

    addPlugins( plugins: Plugin[] ){
        plugins.forEach(( plugin ) => {
            ChartJS.register( plugin );
        });

        this.chart.update();
    };

    removePlugin( plugin: Plugin ){
        ChartJS.unregister( plugin );
        this.chart.update();
    };

    removePlugins( plugins: Plugin[] ){
        plugins.forEach(( plugin ) => {
            ChartJS.unregister( plugin );
        });
        
        this.chart.update();
    };
};