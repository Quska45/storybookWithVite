import type { Chart, ChartTypeRegistry, Plugin } from "chart.js";
import type { AnyObject } from "chart.js/dist/types/basic";
import type { TChartAreaInfo } from "../OntuneChartType";

let lineInfo: TChartAreaInfo;

let click = {
    isDoubleClick: false,
    clickStartTime: null,
};
let clickStartTime = null;
export const Indicator: Plugin = {
    id: 'indicator',
    afterRender( chart, args, options ) {
        if( !lineInfo ){
            return;
        };

        const { ctx, chartArea: { left, right, top, bottom }, scales: { x, y } } = chart;

        ctx.lineWidth = 2;
        ctx.strokeStyle = 'green';

        ctx.save();
        ctx.beginPath();

        ctx.moveTo( lineInfo.startX, lineInfo.startY );
        ctx.lineTo( lineInfo.endX, lineInfo.endY );

        ctx.stroke();
    },
    afterEvent( chart, args, options ) {
        if( args.event.type != 'click' ){
            return;
        };

        let time = new Date().getTime();
        if( time - clickStartTime > 200 ){
            lineInfo = undefined;
            clickStartTime = time;
            return;
        };
        clickStartTime = time;

        const { ctx, chartArea: { left, right, top, bottom } } = chart;
        const xCoor = args.event.x;
        const yCoor = args.event.y;

        if( !args.inChartArea && lineInfo ) {
            lineInfo = undefined;
        } else if( args.inChartArea ){
            lineInfo = {
                startX: xCoor,
                startY: top,
                endX: xCoor,
                endY: bottom
            };
        };
        args.changed = true;
    },
};