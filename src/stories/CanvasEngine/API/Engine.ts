import { Renderer } from "../Core/Basic/Renderer";
import type { Vector } from "../Core/Math/Vector";
import type { Object2D } from "../Core/Object2D/Object2D";
import { Scene } from "../Core/Object2D/Scene";
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

    run(){
        let _this = this;
        (function run( time ){
            _this.RAF.rendering = requestAnimationFrame( run );
            _this.RAF.fpms = time;
            _this.renderer.render( _this.scene );
        })()
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

        let line = new Line( id );
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
        this.scene.add( text );

        return text;
    };

    getObjectById( id: string ): Object2D{
        let targetObject2d = this.scene.getObjectById( id );
        return targetObject2d ? targetObject2d : null;
    };
};