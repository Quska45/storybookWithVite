import { Chart, type ChartConfiguration, type Scale } from "chart.js";
import { MiniMapZoom } from "./MiniMapZoom";

export interface IMiniMapChart {
    type: TMiniMapChartMethod
};

export type TMiniMapChartMethod = 'setMiniMapChart' | 'zoomBox';

export type TChartProperties = {
    ctx: CanvasRenderingContext2D,
    top: number,
    bottom: number,
    left: number,
    right: number,
    width: number,
    height: number,
    xScale: Scale,
    yScale: Scale
}

export class MiniMapChart {
    chart: Chart;
    miniMapZoom: MiniMapZoom;

    /**
     * MiniMapWorker에서 실행되는 모든 메서드가 있는 클래스.
     * 내부적으로 사용되는 기능은 다른 클래스들로 분리되어 있지만 worker에서는 이 클래스의 메서드만을 사용하는 것이 원칙.
     */
    constructor(){
        this.miniMapZoom = new MiniMapZoom();
    };

    setMiniMapChart( event: MessageEvent ){
        const eventData = event.data;
        const { offScreenCanvas, config } = eventData;
        const chart = new Chart( offScreenCanvas, config );

        this.chart = chart;
    };

    zoomBox( event: MessageEvent ){
        const cp = this.getChartProperties();
        const eventData = event.data;
        const { mainChartMinArea, mainChartMaxArea } = eventData;

        this.chart.update();

        // 현재 mainChart의 영역
        cp.ctx.save();

        this.miniMapZoom.drawArea( cp, mainChartMinArea, mainChartMaxArea );
        this.miniMapZoom.drawLeftController( cp, mainChartMinArea );
        this.miniMapZoom.drawRightController( cp, mainChartMaxArea );

        cp.ctx.restore();
    };

    /**
     * chartjs에서 사용빈도가 높은 프로퍼티에 대한 getter
     * @returns {object} chartjs에서 사용빈도가 높은 프로퍼티
     */
    private getChartProperties(): TChartProperties {
        const { ctx, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = this.chart;

        return {
            ctx,
            top,
            bottom,
            left,
            right,
            width,
            height,
            xScale: x,
            yScale: y
        }
    };
};