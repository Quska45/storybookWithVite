import type { TEventIndicatorPosition } from "../../OntuneChartType";
import { EventIndicator } from "./EventIndicator";

export class LeftEventIndicator extends EventIndicator {
    constructor( id: string, value: number, level: number, isShow: boolean, color: string, lineWidth: number, position: TEventIndicatorPosition ){
        super( id, value, level, isShow, color, lineWidth, position );
    };
};