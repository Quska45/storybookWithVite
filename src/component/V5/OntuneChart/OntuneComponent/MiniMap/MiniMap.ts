import type { Chart, ChartConfiguration, ChartData, ChartOptions, ChartTypeRegistry } from "chart.js";
import type { IMiniMapChart, TMiniMapChartMethod } from "./MiniMapWorker/MiniMapChart/MiniMapChart";

export class MiniMap {
    canvas: HTMLCanvasElement;
    config: ChartConfiguration;
    leftController: HTMLElement;
    centerController: HTMLElement;
    rightController: HTMLElement;
    worker: Worker;

    private options: ChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                left: 10,
                right: 10
            }
        },
        scales: {
            x: {
                display: false
            },
            y: {
                display: false
            }
        },
        animation: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            },
            decimation: {
                enabled: true
            },
        },
        devicePixelRatio: 2
    };
    
    constructor( canvas: HTMLCanvasElement, type: keyof ChartTypeRegistry, data: ChartData ){
        // this.canvas = canvas;
        this.config = {
            type: type,
            data: data,
            options: this.options,
            plugins: []
        };

        let offScreenCanvas = canvas.transferControlToOffscreen()
        this.worker = new Worker(new URL('./MiniMapWorker/MiniMapWorker.ts', import.meta.url), {type: 'module'});
        const messageData: IMiniMapChart & {offScreenCanvas, config} = {
            type: 'setMiniMapChart',
            offScreenCanvas: offScreenCanvas,
            config: this.config
        };
        this.worker.postMessage(messageData, [offScreenCanvas]);
    };

    zoomBox( mainChartMinArea: number, mainChartMaxArea: number ){
        const messageData: IMiniMapChart & { mainChartMinArea: number, mainChartMaxArea: number } = {
            type: 'zoomBox',
            mainChartMinArea: mainChartMinArea,
            mainChartMaxArea: mainChartMaxArea
        };

        this.worker.postMessage( messageData );
    };
};