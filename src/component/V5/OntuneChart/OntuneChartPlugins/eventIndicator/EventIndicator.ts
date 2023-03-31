import type { Chart, Plugin } from "chart.js";
import type { AnyObject, EmptyObject } from "chart.js/dist/types/basic";

export class EventIndicator {
    id: string;
    value: number;
    level: number;
    isShow: boolean;
    color: string;
    plugin: Plugin;
    lineWidth: number;

    constructor( id: string, value: number, level: number, isShow: boolean, color: string, lineWidth: number ){
        this.id = id;
        this.value = value;
        this.level = level;
        this.isShow = isShow;
        this.color = color;
        this.lineWidth = lineWidth;

        let _this = this;

        let plugin: Plugin & { value, color, lineWidth } = { id: this.id, value: this.value, color: this.color, lineWidth: this.lineWidth };
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

        if( 
            !(parseInt(yLabelItems[0].label as string) <= this.value
            && parseInt(yLabelItems[ yLabelItems.length - 1 ].label as string) >= this.value)
        ){
            return;
        };

        const yHeight =  yFullHeight - ( yTick * this.value ) + yLabelItems[ yLabelItems.length-1 ].options.translation[ 1 ];
        const rectWidth = 20;
        const rectHeight = 20;

        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.color;

        ctx.save();
        ctx.beginPath();
        
        ctx.setLineDash( [2, 8] );
        ctx.lineDashOffset = 4;
        ctx.moveTo( left, yHeight );
        ctx.lineTo( right, yHeight );
        ctx.stroke();
        
        ctx.beginPath();
        ctx.fillText( this.value.toString(), left - rectWidth + 3, yHeight + 3 );
        
        ctx.fillStyle = this.color.replace( 'rgb', 'rgba' ).replace( ')', ',0.6)' );
        // ctx.fillStyle = this.color;
        ctx.fillRect( left - rectWidth, yHeight - (rectHeight/2), rectWidth, rectHeight );

        ctx.stroke();
        ctx.restore();
    };
};