import type { Chart, Plugin } from "chart.js";
import type { AnyObject, EmptyObject } from "chart.js/dist/types/basic";

export class CanvasLegendMargin {
    id: string;
    unit: string;
    plugin: Plugin;

    constructor(){
        this.id = 'canvasLegendMargin'

        let plugin: Plugin = {
            id: this.id
        };
        plugin.beforeRender = this.beforeRender;
        this.plugin = plugin;
    };

    beforeRender( chart: Chart, legend, options ){
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