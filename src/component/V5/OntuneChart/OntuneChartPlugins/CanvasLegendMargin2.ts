import type { Chart, LegendElement, Plugin } from "chart.js";
import type { AnyObject, EmptyObject } from "chart.js/dist/types/basic";

export class CanvasLegendMargin {
    id: string;
    unit: string;
    plugin: Plugin;

    /**
     * @class canvas로 legend를 만들 때 차트와 legend 사이의 간격을 만들어주는 plugin
    */
    constructor(){
        this.id = 'canvasLegendMargin'

        let plugin: Plugin = {
            id: this.id
        };
        plugin.beforeRender = this.beforeRender;
        this.plugin = plugin;
    };

    /**
     * chartjs plugin의 beforeRender 콜백에 등록 되는 메서드.
     * 개발자가 호출하면 안됨. chartjs가 this.plugin을 등록 받는 형태로 개발되어야 함.
     *
     * @param {Chart} chart
     * @param {args} args
     * @param {options} options
     * @return {void}
     */
    beforeRender( chart: Chart, args, options ){
        const { ctx, chartArea: { left, right, top, bottom }, legend: { position } } = chart;
        if( position === 'right' ){
            chart.legend.left = right + 30;
        } else if( position === 'top' ){
            chart.legend.top -= 20
            console.log('chart.legend.bottom', chart.legend.bottom);
            // chart.legend.bottom = chart.legend.bottom + 1000;
            // chart.legend.top += 100;
            console.log('chart.legend.bottom', chart.legend.bottom);
        }
    };
};