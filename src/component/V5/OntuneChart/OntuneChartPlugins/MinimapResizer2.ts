import type { Chart, Plugin } from "chart.js";
import type { AnyObject, EmptyObject } from "chart.js/dist/types/basic";
import type { OntuneChart } from "../OntuneChart";

export class MinimapResizer {
    id: string;
    plugin: Plugin;
    ontuneChart: OntuneChart;

    constructor( ontuneChart: OntuneChart ){
        this.id = 'minimapInitiator'
        this.ontuneChart = ontuneChart;

        let plugin: Plugin & { ontuneChart } = {
            id: this.id,
            ontuneChart: this.ontuneChart
        };
        // plugin.afterRender = this.afterRender;
        plugin.afterDatasetsDraw = this.afterRender;
        this.plugin = plugin;
    };

    afterRender( chart: Chart, args: EmptyObject, options: AnyObject ){
        this.ontuneChart.resizeMinimapController();
    };
};