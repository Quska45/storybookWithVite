import type { Chart, Plugin } from "chart.js";
import type { AnyObject, EmptyObject } from "chart.js/dist/types/basic";

export class EventIndicator {
    id: string;
    value: number;
    level: number;
    isShow: boolean;
    color: string;
    plugin: Plugin;

    constructor( id: string, value: number, level: number, isShow: boolean, color: string ){
        this.id = id;
        this.value = value;
        this.level = level;
        this.isShow = isShow;
        this.color = color;

        let _this = this;

        let plugin: Plugin & { value, color } = { id: this.id, value: this.value, color: this.color };
        plugin.afterRender = this.afterRender;
        this.plugin = plugin;
    };

    private afterRender( chart: Chart, args: EmptyObject, options: AnyObject ) {
        const { ctx, chartArea: { left, right, top, bottom }, scales: { x, y } } = chart;
        const yLabelItems = chart.scales['y'].getLabelItems();
        const yFirstHeight = yLabelItems[ 0 ].options.translation[ 1 ];
        const yLastHeight = yLabelItems[ yLabelItems.length - 1 ].options.translation[ 1 ];
        const yFullHeight = yFirstHeight - yLastHeight;
        const yTick = yFullHeight / parseInt( yLabelItems[ yLabelItems.length - 1 ].label as string );

        const yHeight =  yFullHeight - ( yTick * this.value ) + yLabelItems[ yLabelItems.length-1 ].options.translation[ 1 ];
        const rectWidth = 20;
        const rectHeight = 20;

        ctx.lineWidth = 1;
        ctx.strokeStyle = this.color;

        ctx.save();
        ctx.beginPath();

        ctx.moveTo( left, yHeight );
        ctx.lineTo( right, yHeight );

        ctx.fillText( this.value.toString(), left - rectWidth + 3, yHeight + 3 );
        
        ctx.fillStyle = this.color.replace( 'rgb', 'rgba' ).replace( ')', ',0.4)' );
        ctx.fillRect( left - rectWidth, yHeight - (rectHeight/2), rectWidth, rectHeight );

        ctx.stroke();
        ctx.restore();
    };
};