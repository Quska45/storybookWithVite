import { Shape } from "./Shape";

export class Line extends Shape {
    constructor( id: string ){
        super( id );
        this.strokeStyle = "#000000";
    };

    drawn( ctx: CanvasRenderingContext2D, zoom: number ): void {
        const line = this;
        
        line.applyPaint( ctx, zoom );

        ctx.beginPath();
        if( line.isFixedSize === true ){
            ctx.moveTo( -0.5 / zoom, 0 );
            ctx.lineTo( 0.5 / zoom, 0 );
        } else {
            ctx.moveTo( -0.5, 0 );
            ctx.lineTo( 0.5, 0 );
        };

        ctx.closePath();
        ctx.stroke();

        let halfY = 0.05 / zoom;
        if( halfY > 0.01 ){
            halfY = 0.01;
        };

        line.selectRange = {
                x: [ -0.5, -0.5, 0.5, 0.5, -0.5 ],
                y: [ -halfY, halfY, halfY, -halfY, -halfY ]
        };
    }
};