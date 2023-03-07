import { Ontune2D } from "../../../../../ontune2D/api/constructor";
import type { OntuneChartConfig } from "../data/Config";

export class OntuneChart {
    config: OntuneChartConfig;
    engine: Ontune2D;

    constructor( config: OntuneChartConfig ){
        this.config = config;
        this.engine = new Ontune2D( config.selector );
        this.engine.moveCamera( this.engine.renderer.canvas.width/2, this.engine.renderer.canvas.height/2 );

        this.engine.run();
    };
};