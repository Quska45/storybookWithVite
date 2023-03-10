import { Object2D } from "./Object2D";

export class Shape extends Object2D {
    lineWidth: number = 1;
    fillStyle: string = 'rgba(0,0,0,1)';
    strokeStyle: string = 'rgba(0,0,0,1)';

    constructor( id: string ) {
        super( id );
    };

    /**
     * context에 대한 기본 적인 속성을 적용시키는 기능
    */
    applyPaint( ctx: CanvasRenderingContext2D ){
        ctx.fillStyle = this.fillStyle;
        ctx.strokeStyle = this.strokeStyle;
        ctx.lineWidth = this.lineWidth;
    };
}