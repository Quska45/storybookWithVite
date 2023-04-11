import type { Chart, Plugin } from "chart.js";
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

    /**
     * Event가 발생되어야 하는 값에 대한 지시선을 표시해주는 플러그인
     * @param {string} id 아이디
     * @param {number} value 표시되어야 할 위치에 대한 값
     * @param {number} level 이벤트 레벨
     * @param {boolean} isShow show/hide 여부
     * @param {string} color 컬러
     * @param {number} lineWidth 지시선의 두께
     * @param {TEventIndicatorPosition} position 지시선의 위치. left, center, right
     */
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

    /**
     * chartjs plugin의 beforeRender 콜백에 등록 되는 메서드.
     * 개발자가 호출하면 안됨. chartjs가 this.plugin을 등록 받는 형태로 개발되어야 함.
     *
     * @param {Chart} chart
     * @param {args} args
     * @param {options} options
     * @return {void}
     */
    afterRender( chart: Chart, args, options ) {
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

    /**
     * 차트에 표시되는 event에 대한 지시선을 그리는 메서드
     * @param {CanvasRenderingContext2D} ctx chart가 사용하는 캔버스의 context
     * @param {number} yHeight 차트의 yHeight
     * @param {number} left canvas에서 차트 영역이 시작되는 위치
     * @param {number} right canvas에서  차트 영역이 끝나는 위치
     */
    protected setDashLine( ctx: CanvasRenderingContext2D, yHeight: number, left: number, right: number ){
        ctx.setLineDash( [2, 8] );
        ctx.lineDashOffset = 4;
        ctx.moveTo( left, yHeight );
        ctx.lineTo( right, yHeight );
        ctx.stroke();
    };

    /**
     * Indicator의 text를 그리는 메서드. 하위 클래스에 상속되어 오버라이딩 필수
     * @param {CanvasRenderingContext2D} ctx chart가 사용하는 캔버스의 context
     * @param {number} yHeight 차트의 yHeight
     * @param {number} left canvas에서 차트 영역이 시작되는 위치
     * @param {number} right canvas에서  차트 영역이 끝나는 위치
     * @param {number} rectWidth Indicator의 value가 표시되는 rect의 width
     * @returns {void}
     */
    protected setText( ctx: CanvasRenderingContext2D, yHeight: number, left: number, right: number, rectWidth: number ){
    };

    /**
     * Indicator의 rect를 그리는 메서드. 하위 클래스에 상속되어 오버라이딩 필수
     * @param {CanvasRenderingContext2D} ctx chart가 사용하는 캔버스의 context
     * @param {number} yHeight 차트의 yHeight
     * @param {number} left canvas에서 차트 영역이 시작되는 위치
     * @param {number} right canvas에서  차트 영역이 끝나는 위치
     * @param {number} rectWidth Indicator의 value가 표시되는 rect의 width
     * @param {number} rectHeight Indicator의 value가 표시되는 rect의 heigth
     * @returns {void}
     */
    protected setRect( ctx: CanvasRenderingContext2D, yHeight: number, left: number, right: number, rectWidth: number, rectHeight: number ){
    };
};