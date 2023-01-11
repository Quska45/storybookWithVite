import { Vector } from "../../Math/Vector";
import { Shape } from "../Shape";

export class Line extends Shape {
    isLine: boolean = true;
    firstCoordinate: Vector = new Vector();
    secondCoordinate: Vector = new Vector();

    constructor( id: string ){
        super( id );
        this.strokeStyle = '#000000';
    };

    setCoordinate( first: Vector, second: Vector ){
        this.firstCoordinate = first;
        this.secondCoordinate = second;
    };

    drawn( ctx: CanvasRenderingContext2D ){
        ctx.beginPath();
        this.applyPaint( ctx );
        ctx.moveTo( this.firstCoordinate.x, this.firstCoordinate.y );
        ctx.lineTo( this.secondCoordinate.x, this.secondCoordinate.y );
        ctx.closePath();
        ctx.stroke();
    };
}