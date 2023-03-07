import { Ontune2DAPI } from './api';
import type { Ontune2D } from './constructor';

export class RendererAPI extends Ontune2DAPI {

    constructor( ontune2d: Ontune2D ){
        super( ontune2d );
    };

    run(){
        const ontune2d = this.ontune2d;

        function _run(){
            (function(){
                ontune2d.event.executeCallback( 'beforeRender' );
                ontune2d.RAF.rendering = requestAnimationFrame( _run );
                ontune2d.renderer.render( ontune2d.camera, ontune2d.scene );
                ontune2d.event.executeCallback( 'afterRender' );
            })();
        };
    
        _run();    
    };

    resize(){
        const ontune2d = this.ontune2d;

        var beforeWidth = ontune2d.renderer.canvas.width;
        var beforeHeight = ontune2d.renderer.canvas.height;
        ontune2d.renderer.resize();
        
        var afterWidth = ontune2d.renderer.canvas.width;
        var afterHeight = ontune2d.renderer.canvas.height;
        
        // 변경 감지시, 리사이즈 콜백
        if( beforeWidth != afterWidth || beforeHeight != afterHeight ){
            ontune2d.event.executeCallback( "resize", afterWidth, afterHeight );
        };
    };

    stop(){

    };

    setQuadrantSystem(){

    };

    getCanvasSize(){
        const ontune2d = this.ontune2d;

        const width = ontune2d.renderer.canvas.width;
        const height = ontune2d.renderer.canvas.height;

        return { width: width, height: height };
    };
};
