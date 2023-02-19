import type { Vector2 } from "../Math/Vector2";
import { Object2D } from "../Object2D/Object2D";

type PaintInfo = {
    lineWidth?: number;
	fillStyle?: string;
	strokeStyle?: string;
	isFixedLineWidth?: boolean;
};

export class Shape extends Object2D {
    lineWidth: number;
	fillStyle: string;
	strokeStyle: string;
	isFixedLineWidth: boolean;
	image: HTMLImageElement;

    constructor( id: string ){
        super( id );
        this.lineWidth = 1; // 외곽선 두께
        this.fillStyle = "rgba(0,0,0,1)"; // 도형 색상
        this.strokeStyle = "rgba(0,0,0,0)"; // 외곽선 색상
        this.image = null; // 도형에 표시할 이미지
    };

    applyPaint( ctx: CanvasRenderingContext2D, zoom: number ){
        let shape = this;

        ctx.fillStyle = shape.fillStyle;
        ctx.strokeStyle = shape.strokeStyle;
        ctx.lineWidth = Math.abs( shape.lineWidth / shape.scale.x );
        if( shape.isFixedLineWidth == true ){
            ctx.lineWidth /= zoom;
        };
    };

    setPaint( paintInfo: PaintInfo ){
        let shape = this;

        shape.fillStyle = paintInfo.fillStyle || shape.fillStyle;
        shape.lineWidth = paintInfo.lineWidth || shape.lineWidth;
        shape.strokeStyle = paintInfo.strokeStyle || shape.strokeStyle;
        shape.isFixedLineWidth = paintInfo.isFixedLineWidth || shape.isFixedLineWidth;
    };

    drawn( ctx: CanvasRenderingContext2D, zoom: number ){
        console.warn( 'Shape의 하위 객체는 반드시 drawn 메서드를 오버라이드 해야 함' );
    };
}