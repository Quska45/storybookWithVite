import { Vector2 } from "../../../../../ontune2D/core/Math/Vector2";
import type { ChartVector2 } from "../data/ChartVector2";
import type { OntuneLineChart } from "./OntuenLineChart";

export class GuidLine {
    ontuneLineChart: OntuneLineChart;

    constructor( ontuneLineChart: OntuneLineChart ){
        this.ontuneLineChart = ontuneLineChart;
    };

    addXLine( position: ChartVector2, size?: ChartVector2 ){
        const ontuneLineChart = this.ontuneLineChart;

        const config = ontuneLineChart.config;
        const engine = ontuneLineChart.engine;
        const canvasSize = engine.getCanvasSize();

        const lineXSize = size ? size.x : canvasSize.width - config.margin.x * 2;
        const lineYSize = size ? size.y : canvasSize.height - config.margin.y * 2;
        
        const lineXPosition = config.margin.x + lineXSize / 2 + position.x;
        const lineYPosition = config.margin.y + position.y;

        // const xLine = engine.addLine( 'OntuneChartXLine' );
        // xLine.position.set( LineXPosition, LineYPosition );
        // xLine.scale.set( LineXSize, 1 );
        // xLine.lineWidth = 1;

        const xLine = engine.addPolyLine( 'OntuneChartXLine' + ontuneLineChart.lineIndex );
        xLine.path = [
            new Vector2( config.margin.x, config.margin.y ),
            new Vector2( config.margin.x + lineXSize, config.margin.y ),
        ];

        ontuneLineChart.lineIndex++;
    };

    addYLine( position: ChartVector2, size?: ChartVector2 ){
        const ontuneLineChart = this.ontuneLineChart;

        const config = ontuneLineChart.config;
        const engine = ontuneLineChart.engine;
        const canvasSize = engine.getCanvasSize();

        const lineXSize = size ? size.x : canvasSize.width - config.margin.y * 2;
        const lineYSize = size ? size.y : canvasSize.height - config.margin.y * 2;
        
        const lineXPosition = config.margin.x + lineXSize / 2 + position.x;
        const lineYPosition = config.margin.y + lineYSize + position.y;

        const yLine = engine.addPolyLine( 'OntuneChartXLine' + ontuneLineChart.lineIndex );
        yLine.path = [
            new Vector2( config.margin.x, config.margin.y ),
            new Vector2( config.margin.x, lineYPosition ),
        ];

        ontuneLineChart.lineIndex++;
    };
};