import { Group } from "../Object2D/Group";
import type { Object2D } from "../Object2D/Object2D";
import type { Scene } from "../Object2D/Scene";
import { Shape } from "../Shape/Shape";
import type { Camera } from "./Camera";

export class Renderer {
    id: string;
    selector: string;
    container: HTMLElement;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    boundingClientRect: DOMRect;

    constructor( id: string, selector: string ){
        let renderer = this;

        // 기본 필드 세팅
        renderer.id = id;
        renderer.selector = selector;
        renderer.container = document.querySelector( selector );
        renderer.canvas = document.createElement( 'canvas' );
        renderer.ctx = renderer.canvas.getContext( '2d' );

        // canvas를 현재 돔트리 안으로 붙여줌
        renderer.container.appendChild( renderer.canvas );

        // canvas를 container의 크기에 맞게 resize
        renderer.resize();
    };

    render( camera: Camera, scene: Scene ){
        const renderer = this;
        const ctx = renderer.ctx;
        const canvas = renderer.canvas;
        const qudrantSystemX = 1 * scene.qudrantSystem.x;
        const qudrantSystemY = -1 * scene.qudrantSystem.y;

        ctx.clearRect( 0, 0, canvas.width, canvas.height );
        ctx.save();
        ctx.scale( qudrantSystemX, qudrantSystemY );

        // 중심으로 이동
        ctx.translate( qudrantSystemX * canvas.width / 2, qudrantSystemY * canvas.height / 2 );

        // 중심 기준 회전
        ctx.rotate( camera.rotation.x );

        // 중심 기준 확대
        ctx.scale( camera.scale.x, camera.scale.y );
        
        // 카메라 이동
        ctx.translate( -camera.position.x, -camera.position.y );

        const children = scene.children;
        for( let i=0; i<children.length; ++i ){
		
            const child = children[ i ];
            child.traverse( function( object2d: Object2D ){
                
                ctx.save();
                ctx.translate( object2d.position.x, object2d.position.y );
                ctx.rotate( object2d.rotation.x );
                ctx.scale( object2d.scale.x, object2d.scale.y );

                const isGroup = object2d instanceof Group ? true : false;
                const isShape = object2d instanceof Shape ? true : false;

                if( isGroup === true ){
                    const group = (object2d as Group);
                    ctx.translate( -group.pivot.x, -group.pivot.y );
                };
                ctx.save();
                ctx.scale( qudrantSystemX, qudrantSystemY );
                if( isShape === true ){
                    const shape = object2d as Shape;
                    ctx.globalAlpha = object2d.opacity;
                    shape.drawn( ctx, camera.scale.x, qudrantSystemX, qudrantSystemY );
                };
                ctx.restore();
                
            }, function( object2d ){
                ctx.restore();
            });
        }
        
        ctx.restore();
    };

    // rendere.canvas를 resize 해주는 기능
    resize(){
        let renderer = this;

        // 현재 컨테이너 크기 조회
        const rect = this.container.getBoundingClientRect();
        const pl = parseFloat( renderer.container.style.paddingLeft );
        const pr = parseFloat( renderer.container.style.paddingRight );
        const pb = parseFloat( renderer.container.style.paddingBottom );
        const pt = parseFloat( renderer.container.style.paddingTop );
        
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
        renderer.canvas.width = rect.width;
        renderer.canvas.height = rect.height;
        renderer.boundingClientRect = rect;
    }
};