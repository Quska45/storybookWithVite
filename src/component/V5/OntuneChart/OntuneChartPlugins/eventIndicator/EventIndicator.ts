import type { Chart, Plugin } from "chart.js";
import type { AnyObject, EmptyObject } from "chart.js/dist/types/basic";
import type { IEventIndicator, TEventIndicatorPosition } from "../../OntuneChartType";

export class EventIndicator implements IEventIndicator {
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
        const yMinLabel = Number((yLabelItems[ 0 ].label as string).replaceAll(',', ''));
        const yMaxLabel = Number((yLabelItems[ yLabelItems.length - 1 ].label as string).replaceAll(',', ''))
        let yTick = yFullHeight / (yMaxLabel - yMinLabel);
        let _value: number;
        _value = this.value - yMinLabel;

        if( 
            !(yMinLabel <= this.value && yMaxLabel >= this.value)
        ){
            return;
        };

        let yHeight =  yFullHeight - ( yTick * _value ) + yLabelItems[ yLabelItems.length-1 ].options.translation[ 1 ];
        let rectWidth = 20;
        const rectHeight = 20;

        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.color;

        ctx.save();
        ctx.beginPath();
        
        this.setDashLine( ctx, yHeight, left, right );
        
        const textWidth = ctx.measureText(this.value.toString()).width;
        ctx.beginPath();
        textWidth > rectWidth ? rectWidth = textWidth : null;
        this.setText( ctx, yHeight, left, right, rectHeight );
        
        ctx.fillStyle = this.color.replace( 'rgb', 'rgba' ).replace( ')', ',0.6)' );
        this.setRect( ctx, yHeight, left, right, rectWidth, rectHeight );

        ctx.stroke();
        ctx.restore();
    };

    protected setProperties(){

    };

    protected setDashLine( ctx: CanvasRenderingContext2D, yHeight: number, left: number, right: number ){
        ctx.setLineDash( [2, 8] );
        ctx.lineDashOffset = 4;
        ctx.moveTo( left, yHeight );
        ctx.lineTo( right, yHeight );
        ctx.stroke();
    };

    protected setText( ctx: CanvasRenderingContext2D, yHeight: number, left: number, right: number, rectWidth: number ){
    };

    protected setRect( ctx: CanvasRenderingContext2D, yHeight: number, left: number, right: number, rectWidth: number, rectHeight: number ){
    };
};