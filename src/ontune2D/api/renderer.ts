import { Ontune2D } from './constructor';

export function run( ontune2d: Ontune2D ){
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
export function stop(){

};
export function setQuadrantSystem(){

};
export function resize(){
    const ontune2d = Ontune2D.prototype;

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