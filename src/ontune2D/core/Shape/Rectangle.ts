import type { Vector2 } from "../Math/Vector2";
import { Shape } from "./Shape";

export class Rectangle extends Shape {
    constructor( id: string ){
        super( id );

        this.selectRange = {
            x: [ -0.5, -0.5, 0.5, 0.5, -0.5 ],
		    y: [ -0.5, 0.5, 0.5, -0.5, -0.5 ]
        };
    };

    drawn( ctx: CanvasRenderingContext2D, zoom: number ){
        const rectangle = this;

        rectangle.applyPaint( ctx, zoom );
        ctx.beginPath();
        if( rectangle.isFixedSize === true ){
            const size = 0.5 / zoom;
            rectangle.selectRange = {
                x: [ -size, -size, size, size, -size ],
			    y: [ -size, size, size, -size, -size ]
            };
            ctx.rect( -0.5 / zoom, -0.5 / zoom, 1 / zoom, 1 / zoom );
        } else {
            delete rectangle.selectRange;
            ctx.rect( -0.5, -0.5, 1, 1 );
        };

        ctx.closePath();
        ctx.stroke();
        
        rectangle.fillStyle ? ctx.fill() : null;
    };
};