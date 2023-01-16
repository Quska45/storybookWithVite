import { Engine } from "../../CanvasEngine/API/Engine"
import { Vector } from "../../CanvasEngine/Core/Math/Vector";
import { Quadrant } from "../../CanvasEngine/Core/Object2D/Scene";
import type { TConfig } from "../Common/Config";

export class LineChart {
    engine: Engine;
    config: TConfig;

    constructor( selector, config: TConfig ){
        this.engine = new Engine( selector );
        this.config = config;
    };

    init(){
        this.engine.setQuadrant( Quadrant.quadrant1 );
        this.engine.addLine( 'testLine', new Vector(0,0), new Vector(50,50) );
        this.engine.addText('1', 'abcdef', new Vector(50,50));
        // engine.renderer.ctx.restore()
    };

    run( callback? ){
        this.engine.run();
    }
};