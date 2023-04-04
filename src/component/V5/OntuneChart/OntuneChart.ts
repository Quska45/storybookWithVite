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
import { MiniMap } from './OntuneComponent/MiniMap/MiniMap';

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
    minimap: MiniMap;
    
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

    makeMinimap( minimapCanvas: HTMLCanvasElement ){
        const chart = this.chart;

        this.minimap = new MiniMap( minimapCanvas, chart.config.type, chart.config.data );
    };

    setMinimapController(  left: HTMLElement, center: HTMLElement, right: HTMLElement  ){
        this.minimap.setController( left, center, right );
    }

    resizeMinimapController(){
        const xScale = this.chart.scales[ 'x' ];
        const oXScale = this.chart.getInitialScaleBounds().x;
        if( !oXScale.min ){
            oXScale.max = xScale.max;    
        }
        oXScale.min = 0;

        const left = ( xScale.min - oXScale.min ) / ( oXScale.max - oXScale.min ) * 100;
        const right = ( xScale.max - oXScale.min ) / ( oXScale.max - oXScale.min ) * 100;
        
        const l = left > 0 ? (left > 98 ? 98 : left) : 0;
        const r = right < 100 ? (right < 2 ? 2 : right) : 100;

        this.minimap.resizeMinimapController( l, r );
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