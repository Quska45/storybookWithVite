import type { Quadrant } from "../Scene";
import { Shape } from "../Shape";

export class Circle extends Shape {
    radius: number = 2;

    constructor( id: string ){
        super( id );
    };

    drawn(ctx: CanvasRenderingContext2D, quadrant: Quadrant, canvas: HTMLCanvasElement): void {
        const realPosition = this.getPositionCoordinate( quadrant, canvas );

        this.applyPaint( ctx );
        ctx.beginPath();
        ctx.arc( realPosition.x, realPosition.y, this.radius, 0, Math.PI * 2 );
        ctx.closePath();
        ctx.stroke();
    };
};