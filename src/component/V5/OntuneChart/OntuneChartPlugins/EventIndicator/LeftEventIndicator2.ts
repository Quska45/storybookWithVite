import type { TEventIndicatorPosition } from "../../OntuneChartType";
import { EventIndicator } from "./EventIndicator2";

export class LeftEventIndicator extends EventIndicator {
    constructor( id: string, value: number, level: number, isShow: boolean, color: string, lineWidth: number, position: TEventIndicatorPosition ){
        super( id, value, level, isShow, color, lineWidth, position );
    };

    protected setText( ctx: CanvasRenderingContext2D, yHeight: number, left: number, right: number, rectWidth: number ){
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText( this.value.toString(), left - (rectWidth/2), yHeight );
    };

    protected setRect( ctx: CanvasRenderingContext2D, yHeight: number, left: number, right: number, rectWidth: number, rectHeight: number ){
        ctx.fillRect( left - rectWidth, yHeight - (rectHeight/2), rectWidth, rectHeight );
    };
};