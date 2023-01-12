import type { Vector } from "../../Math/Vector";
import type { Quadrant } from "../Scene";
import { Shape } from "../Shape";

export class Text extends Shape {
    textAlign: CanvasTextAlign = 'center';
    textBaseLine: CanvasTextBaseline = 'middle';
    fontFamily: string = 'Arial';
    text: string;

    constructor( id: string, text: string ){
        super( id );
        this.text = text;
    };

    drawn( ctx: CanvasRenderingContext2D, quadrant: Quadrant, canvas: HTMLCanvasElement ){
        const realPosition = this.getPositionCoordinate( quadrant, canvas );

        this.applyPaint( ctx );
        ctx.beginPath();
        ctx.textAlign = this.textAlign;
        ctx.textBaseline = this.textBaseLine;
        ctx.closePath();
        ctx.strokeText( this.text, realPosition.x , realPosition.y );
    };
};