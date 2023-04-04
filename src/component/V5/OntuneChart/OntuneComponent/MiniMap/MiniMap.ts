import type { ChartData, ChartOptions, ChartTypeRegistry } from "chart.js";

export class MiniMap {
    canvas: HTMLCanvasElement;
    type: keyof ChartTypeRegistry;
    data: ChartData;

    private options: ChartOptions; 

    constructor( canvas: HTMLCanvasElement, type: keyof ChartTypeRegistry, data: ChartData ){
        this.canvas = canvas;
        this.type = type;
        this.data = data;
    };

    
}