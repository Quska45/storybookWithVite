import { Vector2 } from "../../../../../ontune2D/core/Math/Vector2";
import { ChartVector2 } from "../data/ChartVector2";
import type { OntuneChartConfig } from "../data/Config";
import { GuidLine } from "./GuideLine";
import { OntuneChart } from "./OntuneChart";

export class OntuneLineChart extends OntuneChart {
    lineIndex: number;
    guideLine: GuidLine;

    constructor( config: OntuneChartConfig ){
        super( config );
        this.lineIndex = 0;
        this.guideLine = new GuidLine( this );
    };

    addBaseLine(){
        const ontuneLineChart = this;
        ontuneLineChart.guideLine.addXLine( new ChartVector2( 0, 0 ) );
        ontuneLineChart.guideLine.addYLine( new ChartVector2( 0, 0 ) );
    }
};