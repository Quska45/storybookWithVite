import type { Chart, ChartTypeRegistry, Plugin } from "chart.js";
import type { AnyObject } from "chart.js/dist/types/basic";

export const crossHairLabel: Plugin<keyof ChartTypeRegistry, AnyObject> = {
    id: 'crossHairLabel',
    // drawing part

    // mousemove
    afterEvent( chart, args, options ) {
        const { ctx, chartArea: { left, right, top, bottom } } = chart;
    },
    // afterEvent( chart, args ){
    //     const { 
    //         ctx,
    //         chartArea: { left, right, top, bottom }
    //     } = chart;

    //     const xCoor = args.event

    //     console.log(args);
    // },
}