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
        plugin.afterRender = this.afterRender;
        this.plugin = plugin;

    };

    afterRender( chart: Chart, args: EmptyObject, options: AnyObject ){
        const { ctx, chartArea: { left, right, top, bottom } } = chart;
        const yLabelItems = chart.scales['y'].getLabelItems();
        const lastYLabelItem = yLabelItems[ yLabelItems.length - 1 ];

        const fontSize = 12;
        const xPosition = yLabelItems[ yLabelItems.length - 1 ].options.translation[0] - yLabelItems[ yLabelItems.length - 1 ].font.size + (fontSize /2);
        const yPosition = yLabelItems[ yLabelItems.length - 1 ].options.translation[1] - yLabelItems[ yLabelItems.length - 1 ].font.size - (fontSize /2);

        ctx.strokeStyle = 'black';

        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText( `(${this.unit})`, xPosition, yPosition );

        ctx.restore();
    };

};