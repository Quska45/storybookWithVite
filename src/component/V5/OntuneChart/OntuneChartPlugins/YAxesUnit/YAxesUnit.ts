import type { Chart, Plugin } from "chart.js";
import type { AnyObject, EmptyObject } from "chart.js/dist/types/basic";

export class YAxesUnit {
    id: string;
    unit: string;
    plugin: Plugin;

    constructor( unit: string ){
        this.id = 'yAxesUnit'
        this.unit = unit;

        let plugin: Plugin & { unit } = {
            id: this.id,
            unit: this.unit
        };

    };

    afterRender( chart: Chart, args: EmptyObject, options: AnyObject ){
        const { ctx, chartArea: { left, right, top, bottom } } = chart;
        const yLabelItems = chart.scales['y'].getLabelItems();
        const lastYLabelItem = yLabelItems[ yLabelItems.length ];

        console.log('lastYLabelItem', lastYLabelItem);

    };

};