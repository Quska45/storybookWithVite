import { Renderer } from "../Core/Basic/Renderer";
import type { Vector } from "../Core/Math/Vector";
import type { Object2D } from "../Core/Object2D/Object2D";
import { Quadrant, Scene } from "../Core/Object2D/Scene";
import { Line } from "../Core/Object2D/Shape/Line";
import { Text } from "../Core/Object2D/Shape/Text";

export class Engine {
    renderer: Renderer;
    scene: Scene;
    RAF = {
        rendering: null,
        fpms: -1
    };
    
    constructor( selector: string ){
        this.renderer = new Renderer( selector );
        this.scene = new Scene( 'Scene' + selector );
    };

    /**
     * engine의 instace에서 직접 호출되면 안되는 메서드 입니다.
     * run 내부에서 실행시키기 위해 만들어진 함수 입니다.
    */
    innerRun( callback: FrameRequestCallback ){
        callback.apply(this, 0);
    };

    run(){
        let _this = this;

        function _run( time ){
            _this.RAF.rendering = requestAnimationFrame( _run );
            _this.RAF.fpms = time;
            _this.renderer.render( _this.scene );
        };

        _run( 0 );
    };

    stop(){
        cancelAnimationFrame( this.RAF.rendering );
        this.RAF.rendering = null;
    };

    addLine( id: string, firstCoordinate: Vector, secondCoordinate: Vector ): Object2D | null{
        let object2d = this.getObjectById( id );
        if( object2d ){
            console.log( `'${ id }'는 중복된 id 값 입니다.` );
            return null;
        };

        let line = new Line( id, firstCoordinate, secondCoordinate );
        this.scene.add( line );

        return line;
    };

    addText( id: string, textStr: string, position: Vector ): Object2D | null{
        let object2d = this.getObjectById( id );
        if( object2d ){
            console.log( `'${ id }'는 중복된 id 값 입니다.` );
            return null;
        };

        let text = new Text( id, textStr );
        text.position.x = position.x;
        text.position.y = position.y;
        this.scene.add( text );

        return text;
    };

    getObjectById( id: string ): Object2D{
        let targetObject2d = this.scene.getObjectById( id );
        return targetObject2d ? targetObject2d : null;
    };

    setQuadrant( quadrant: Quadrant ){
        this.scene.setCSD( quadrant );
    };
};