import type { Chart, ChartTypeRegistry, Plugin } from "chart.js";
import type { AnyObject } from "chart.js/dist/types/basic";
import type { TCrossHairInfo } from "../OntuneChartType";

// crosshairLabel plugin block
let crosshairInfos: TCrossHairInfo[];
export const crossHairLabel: Plugin<keyof ChartTypeRegistry, AnyObject> = {
    id: 'crossHairLabel',
    // drawing part
    afterDatasetDraw(chart, args, options) {
        const { ctx, chartArea: { left, right, top, bottom }, scales: { x, y } } = chart;

        ctx.lineWidth = 2;
        ctx.strokeStyle = 'grey';

        if( !crosshairInfos ){
            return;
        };

        ctx.save();
        ctx.beginPath();

        // line
        crosshairInfos.forEach(( crosshairInfo ) => {
            ctx.moveTo( crosshairInfo.startX, crosshairInfo.startY );
            ctx.lineTo( crosshairInfo.endX, crosshairInfo.endY );
        });

        // rect
        ctx.fillStyle = 'grey';
        ctx.fillRect( 0, crosshairInfos[0].startY - 10, left, 20 ); // yaxes value
        ctx.fillRect( crosshairInfos[1].startX - (50 / 2), bottom, 50, 20 ); // xaxes value

        // text
        ctx.textAlign = 'center';

        ctx.font = 'bold 12px sans-serif';
        ctx.fillStyle = 'white';
        ctx.fillText( y.getValueForPixel( crosshairInfos[0].startY ).toFixed(2), left / 2, crosshairInfos[0].startY + 5 );
        ctx.fillText( x.getLabels()[x.getValueForPixel(crosshairInfos[1].startX)], crosshairInfos[1].startX, bottom + 15 );

        ctx.stroke();
    },
    // mousemove
    afterEvent( chart, args, options ) {
        const { ctx, chartArea: { left, right, top, bottom } } = chart;

        const xCoor = args.event.x;
        const yCoor = args.event.y;

        if( !args.inChartArea && crosshairInfos ) {
            crosshairInfos = undefined;
            args.changed = true;
        } else if( args.inChartArea ){
            crosshairInfos = [
                {
                    startX: left,
                    startY: yCoor,
                    endX: right,
                    endY: yCoor
                },
                {
                    startX: xCoor,
                    startY: top,
                    endX: xCoor,
                    endY: bottom
                },
            ];

            args.changed = true;
        }
    },
}