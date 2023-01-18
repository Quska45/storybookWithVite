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
        this.resize();
        
        this.ctx = this.canvas.getContext( '2d' );
    };

    resize(){
        // 현재 컨테이너 크기 조회
        let rect = this.container.getBoundingClientRect();
        let pl = parseFloat( this.container.style.paddingLeft );
        let pr = parseFloat( this.container.style.paddingRight );
        let pb = parseFloat( this.container.style.paddingBottom );
        let pt = parseFloat( this.container.style.paddingTop );
        
        if( isNaN( pl ) === false ){
            rect.width -= pl;
        }
        if( isNaN( pr ) === false ){
            rect.width -= pr;
        }
        if( isNaN( pb ) === false ){
            rect.height -= pb;
        }
        if( isNaN( pt ) === false ){
            rect.height -= pt;
        }
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }

    render( scene: Scene ){
        this.ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height );
        scene.children.forEach(( child: Object2D ) => {
            child.drawn( this.ctx, scene.quadrant, this.canvas );
        });
    };
};