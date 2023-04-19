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
    type ChartData,
    LogarithmicScale,
    type Plugin,
    type LegendItem,
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom'
import {} from 'chartjs-adapter-moment'
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
    ontuneLegend: OntuneLegend;
    minimap: MiniMap;
    
    /**
     * onTuneChart의 메인 클래스. chart에 관련된 모든 기능을 제어하는 매니저의 역할
     * @param {HTMLCanvasElement} canvas 차트가 그려지는 Canvas Element
     * @param {ChartConfiguration} config 차트의 인자로 받는 config
     */
    constructor( canvas: HTMLCanvasElement, config: ChartConfiguration ){
        this.chart = new ChartJS( canvas, config );
        this.ontuneLegend = new OntuneLegend( this.chart.legend );

        this.chart.resize();
    };

    /**
     * Html로 legend를 만들어 주는 메서드(기본형)
     * @deprecated
     * @param {string} id 레전드가 만들어지는 html의 id
     * @param {TLengendOptions} legendOptions 레전드에 대한 옵션
     * @returns {void}
     */
    makeLegend( id: string, legendOptions: TLengendOptions ){
        this.ontuneLegend.make( this.chart, id, legendOptions );
    };

    /**
     * onTuneGrid를 사용해 legend를 만들어 주는 메서드
     * @param {string} id 레전드가 만들어지는 html의 id
     * @param {TLengendOptions} legendOptions 레전드에 대한 옵션
     * @returns {void}
     */
    makeOntuneGridLegendOptions( id: string, legendOptions: TLengendOptions ){
        this.ontuneLegend.make( this.chart, id, legendOptions );
    };

    /**
     * 차트의 zoom을 최초 상태로 되돌리는 메서드
     * @returns {void}
     */
    resetZoom(){
        this.chart.resetZoom();
    };

    /**
     * 미니맵을 생성하는 메서드
     * @param {HTMLCanvasElement} minimapCanvas 미니맵이 그려지는 Canvas Element
     * @returns {void}
     */
    makeMinimap( minimapCanvas: HTMLCanvasElement ){
        const chart = this.chart;
        const mainChartXscale = chart.scales[ 'x' ];

        this.minimap = new MiniMap( minimapCanvas, chart.config.type, chart.config.data );
        this.minimap.zoomBox( mainChartXscale.min, mainChartXscale.max );
    };

    /**
     * 레전드의 목록 조회 메서드
     * @returns {LegendItem[]}
     */
    getLegendItems(){
        return this.chart.options.plugins.legend.labels.generateLabels( this.chart );
    };

    /**
     * 현재 생성되어 있는 레전드의 dom element를 삭제하는 메서드
     * @param {string} id 레전드가 들어 있는 컨테이너의 아이디
     * @returns {void}
     */
    destroyLegend( id: string ){
        this.ontuneLegend.destroy( id );
    };

    /**
     * 차트와 관련된 객체들을 삭제 하는 메서드
     * @returns {void}
     */
    destroy(){
        this.chart.destroy();
        this.ontuneLegend = null;
        this.chart = null;
    };

    /**
     * 플러그인을 추가 시키는 메서드
     * @param {Plugin} plugin 차트에 추가될 플러그인
     * @returns {void}
     */
    addPlugin( plugin: Plugin ){
        this.chart.config.plugins.push( plugin );
        this.chart.update();
    };

    /**
     * 여러개의 플러그인을 한 번에 추가 시키는 메서드
     * @param {Plugin[]} plugins 차트에 추가될 플러그인의 배열
     * @returns {void}
     */
    addPlugins( plugins: Plugin[] ){
        plugins.forEach(( plugin ) => {
            ChartJS.register( plugin );
        });

        this.chart.update();
    };

    /**
     * 플러그인 목록에 대한 index로 등록된 플러그인을 삭제하는 메서드
     * @param {number} index 차트에서 삭제될 플러그인의 index
     * @returns {void}
     */
    removePluginByPluginIndex( index: number ){
        if( index < 0 ){
            return;
        };

        this.chart.config.plugins.splice( index, 1 );
        this.chart.update();
    };

    /**
     * 플러그인을 삭제 하는 메서드
     * @param {Plugin} plugin 차트에서 삭제될 플러그인
     * @returns {void}
     */
    removePlugin( plugin: Plugin ){
        const plugins = this.chart.config.plugins;

        let pluginIndex = plugins.findIndex(( _plugin ) => {
            return _plugin === plugin;
        });

        this.removePluginByPluginIndex( pluginIndex );
    };

    /**
     * 여러개의 플러그인을 한 번에 삭제하는 메서드
     * @param {Plugin[]} plugins 차트에서 삭제될 플러그인의 목록
     */
    removePlugins( plugins: Plugin[] ){
        plugins.forEach(( plugin ) => {
            ChartJS.unregister( plugin );
        });
        
        this.chart.update();
    };

    /**
     * 현재 차트의 상태와 관련된 데이터를 리턴하는 메서드
     */
    exportChartData(){
        
    };

    /**
     * 차트 데이터에 특정 lineWidth를 일괄 적용하는 메서드
     * @param {ChartData} data lineWidth를 일괄 적용할 차트 데이터
     * @param {number} lineWidth 차트 데이터에 일괄 적용될 lineWidth
     * @returns {void}
     */
    static setAllDataByLineWidth( data: ChartData, lineWidth: number ){
        data.datasets.forEach(( cur ) => {
            cur.borderWidth = lineWidth;
        });
    };
};