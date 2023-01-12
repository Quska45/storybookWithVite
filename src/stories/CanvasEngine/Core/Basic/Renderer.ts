import type { Object2D } from "../Object2D/Object2D";
import type { Scene } from "../Object2D/Scene";
import type { Camera } from "./Camera";

export class Renderer {
    container: HTMLElement;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D | null;
    isRender: boolean;
    
    constructor( selector ){
        this.container = document.querySelector( selector ) as HTMLElement;
        this.canvas = document.createElement( 'canvas' );
        this.container.appendChild( this.canvas );

        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';

        this.ctx = this.canvas.getContext( '2d' );
    };

    render( scene: Scene ){
        this.ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height );
        scene.children.forEach(( child: Object2D ) => {
            child.drawn( this.ctx, scene.quadrant, this.canvas );
        });
    };
};