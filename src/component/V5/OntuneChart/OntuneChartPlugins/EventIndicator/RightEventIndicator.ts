import type { TEventIndicatorPosition } from "../../OntuneChartType";
import { EventIndicator } from "./EventIndicator";

export class RightEventIndicator extends EventIndicator {
    constructor( id: string, value: number, level: number, isShow: boolean, color: string, lineWidth: number, position: TEventIndicatorPosition ){
        super( id, value, level, isShow, color, lineWidth, position );
    };

    protected setText(ctx: CanvasRenderingContext2D, yHeight: number, left: number, right: number, rectWidth: number): void {
        let textWidth = ctx.measureText( this.value.toString() ).width;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText( this.value.toString(), right + (textWidth / 2), yHeight );
    };

    protected setRect(ctx: CanvasRenderingContext2D, yHeight: number, left: number, right: number, rectWidth: number, rectHeight: number): void {
        ctx.fillRect( right, yHeight - (rectHeight/2), rectWidth, rectHeight );
    };
};