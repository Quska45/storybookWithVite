import { Ontune2D } from "../../../../../ontune2D/api/constructor";
import { Group } from "../../../../../ontune2D/core/Object2D/Group";
import { Line } from "../../../../../ontune2D/core/Shape/Line";

export const engineSample = {
    makeSomeObject( engine: Ontune2D ){
        engine = new Ontune2D( '#canvasContainer' );
        // engine.camera.position.set(engine.renderer.canvas.width/2, engine.renderer.canvas.height/2)
        engine.moveCamera( engine.renderer.canvas.width/2, engine.renderer.canvas.height/2 );
        engine.startMouseControl();
        // engine.zoomInCamera();
        
        let rect = engine.addRectangle( 'rect' );
        rect.position.set(50, 50);
        rect.scale.set(50, 50);
        rect.opacity = 0.1
        
        let line = engine.addLine( 'line' );
        line.position.set(20, 20)
        line.scale.set(20, 20);

        // for( let i=0; i<10000; ++i ){
        //     let line = engine.addLine( 'line'+i );
        //     line.position.set(20+i, 20+i)
        //     line.scale.set(20, 20);
        // }

        let text = engine.addText( 'text', '텍스트가 들어감' );
        text.position.set(20, 20)
        text.scale.set(10, 10);


        let newLine = new Line( 'newLine' );
        newLine.position.set( 100, 100 );
        newLine.scale.set( 100,100 );
        let group = new Group( 'group' );
        group.add(newLine);
        engine.addObject( group );
        console.log(engine.scene.children);

        engine.run();
    }
}