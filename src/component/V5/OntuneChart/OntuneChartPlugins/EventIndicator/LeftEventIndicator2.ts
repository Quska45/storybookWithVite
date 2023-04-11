import type { TEventIndicatorPosition } from "../../OntuneChartType";
import { EventIndicator } from "./EventIndicator2";

export class LeftEventIndicator extends EventIndicator {
    /**
     * 차트의 왼쪽에 추가되는 EventIndicator Plugin
     * @extends EventIndicator
     * @param {string} id 아이디
     * @param {number} value 표시되어야 할 위치에 대한 값
     * @param {number} level 이벤트 레벨
     * @param {boolean} isShow show/hide 여부
     * @param {string} color 컬러
     * @param {number} lineWidth 지시선의 두께
     * @param {TEventIndicatorPosition} position 지시선의 위치. left, center, right
     */
    constructor( id: string, value: number, level: number, isShow: boolean, color: string, lineWidth: number, position: TEventIndicatorPosition ){
        super( id, value, level, isShow, color, lineWidth, position );
    };

    /**
     * Indicator의 text를 그리는 메서드
     * @param {CanvasRenderingContext2D} ctx chart가 사용하는 캔버스의 context
     * @param {number} yHeight 차트의 yHeight
     * @param {number} left canvas에서 차트 영역이 시작되는 위치
     * @param {number} right canvas에서  차트 영역이 끝나는 위치
     * @param {number} rectWidth Indicator의 value가 표시되는 rect의 width
     * @returns {void}
     */
    protected setText( ctx: CanvasRenderingContext2D, yHeight: number, left: number, right: number, rectWidth: number ){
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText( this.value.toString(), left - (rectWidth/2), yHeight );
    };

    /**
     * Indicator의 rect를 그리는 메서드
     * @param {CanvasRenderingContext2D} ctx chart가 사용하는 캔버스의 context
     * @param {number} yHeight 차트의 yHeight
     * @param {number} left canvas에서 차트 영역이 시작되는 위치
     * @param {number} right canvas에서  차트 영역이 끝나는 위치
     * @param {number} rectWidth Indicator의 value가 표시되는 rect의 width
     * @param {number} rectHeight Indicator의 value가 표시되는 rect의 heigth
     * @returns {void}
     */
    protected setRect( ctx: CanvasRenderingContext2D, yHeight: number, left: number, right: number, rectWidth: number, rectHeight: number ){
        ctx.fillRect( left - rectWidth, yHeight - (rectHeight/2), rectWidth, rectHeight );
    };
};