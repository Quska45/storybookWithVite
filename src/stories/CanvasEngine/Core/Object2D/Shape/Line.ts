import type { Vector } from "../../Math/Vector";
import type { Quadrant } from "../Scene";
import { Shape } from "../Shape";

export class Line extends Shape {
    isLine: boolean = true;
    firstCoordinate: Vector;
    secondCoordinate: Vector;

    constructor( id: string, firstCoordinate: Vector, secondCoordinate: Vector ){
        super( id );
        this.strokeStyle = '#000000';
        this.firstCoordinate = firstCoordinate;
        this.secondCoordinate = secondCoordinate;
    };

    setCoordinate( first: Vector, second: Vector ){
        this.firstCoordinate = first;
        this.secondCoordinate = second;
    };

    drawn( ctx: CanvasRenderingContext2D, quadrant: Quadrant, canvas: HTMLCanvasElement ){
        const firstRealPosition = this.getPositionCoordinateByPosition( quadrant, canvas, this.firstCoordinate );
        const secondRealPosition = this.getPositionCoordinateByPosition( quadrant, canvas, this.secondCoordinate );

        ctx.beginPath();
        this.applyPaint( ctx );
        ctx.moveTo( firstRealPosition.x, firstRealPosition.y );
        ctx.lineTo( secondRealPosition.x, secondRealPosition.y );
        ctx.stroke();
        ctx.closePath();
    };
}