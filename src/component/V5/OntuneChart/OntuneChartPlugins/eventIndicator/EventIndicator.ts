import type { Chart, Plugin } from "chart.js";
import type { AnyObject, EmptyObject } from "chart.js/dist/types/basic";
import type { FONT_SIZE } from "../../../../../stories/TS/Common/ConstValue";
import type { TEventIndicator, TEventIndicatorPosition } from "../../OntuneChartType";

export class EventIndicator implements TEventIndicator {
    id: string;
    value: number;
    level: number;
    isShow: boolean;
    color: string;
    plugin: Plugin;
    lineWidth: number;
    position: TEventIndicatorPosition;
    fontSize: number;

    constructor( id: string, value: number, level: number, isShow: boolean, color: string, lineWidth: number, position: TEventIndicatorPosition ){
        this.id = id;
        this.value = value;
        this.level = level;
        this.isShow = isShow;
        this.color = color;
        this.lineWidth = lineWidth;
        this.position = position;
        this.fontSize = 12;

        let _this = this;

        let plugin: Plugin & { value, color, lineWidth, position, fontSize, setDashLine, setText, setRect } = {
            id: this.id,
            value: this.value,
            color: this.color,
            lineWidth: this.lineWidth,
            position: this.position,
            fontSize: this.fontSize,
            setDashLine: this.setDashLine,
            setText: this.setText,
            setRect: this.setRect
        };
        plugin.afterRender = this.afterRender;
        this.plugin = plugin;
    };

    afterRender( chart: Chart, args: EmptyObject, options: AnyObject ) {
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
        
        this.setDashLine( ctx, yHeight, left, right );
        
        ctx.beginPath();
        // ctx.fillText( this.value.toString(), left - rectWidth + 3, yHeight + 3 );
        this.setText( ctx, yHeight, left, right, rectHeight );
        
        ctx.fillStyle = this.color.replace( 'rgb', 'rgba' ).replace( ')', ',0.6)' );
        // ctx.fillStyle = this.color;
        this.setRect( ctx, yHeight, left, right, rectWidth, rectHeight );
        // ctx.fillRect( left - rectWidth, yHeight - (rectHeight/2), rectWidth, rectHeight );

        ctx.stroke();
        ctx.restore();
    };

    setDashLine( ctx: CanvasRenderingContext2D, yHeight: number, left: number, right: number ){
        ctx.setLineDash( [2, 8] );
        ctx.lineDashOffset = 4;
        ctx.moveTo( left, yHeight );
        ctx.lineTo( right, yHeight );
        ctx.stroke();
    };

    setText( ctx: CanvasRenderingContext2D, yHeight: number, left: number, right: number, rectWidth: number ){
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText( this.value.toString(), left - (rectWidth/2), yHeight );
    };

    setRect( ctx: CanvasRenderingContext2D, yHeight: number, left: number, right: number, rectWidth: number, rectHeight: number ){
        ctx.fillRect( left - rectWidth, yHeight - (rectHeight/2), rectWidth, rectHeight );
    };
};