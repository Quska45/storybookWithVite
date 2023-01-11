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

    drawn( ctx: CanvasRenderingContext2D ){
        this.applyPaint( ctx );

        ctx.beginPath();
        ctx.textAlign = this.textAlign;
        ctx.textBaseline = this.textBaseLine;
        ctx.closePath();
        ctx.strokeText( this.text, this.position.x , this.position.y );
    };
};