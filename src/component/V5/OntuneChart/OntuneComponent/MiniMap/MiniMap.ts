import type { ChartConfiguration, ChartData, ChartOptions, ChartTypeRegistry } from "chart.js";

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
        scales: {
            x: {
                display: false
            },
            y: {
                display: false
            }
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            }
        }
    }; 

    constructor( canvas: HTMLCanvasElement, type: keyof ChartTypeRegistry, data: ChartData ){
        // this.canvas = canvas;
        this.config = {
            type: type,
            data: data,
            options: this.options
        };

        let offScreenCanvas = canvas.transferControlToOffscreen()
        this.worker = new Worker(new URL('./MinimapWorker.js', import.meta.url), {type: 'module'});
        this.worker.postMessage({offScreenCanvas, config: this.config}, [offScreenCanvas]);
        // this.chart = new Chart( this.canvas, this.config );
    };

    setController( left: HTMLElement, center: HTMLElement, right: HTMLElement ){
        this.leftController = left;
        this.centerController = center;
        this.rightController = right;
    };

    resizeMinimapController( left: number, right: number ){
        this.leftController.style.width = `${left}%`;
        this.centerController.style.left = `${left}%`;
        this.centerController.style.width = `${right-left}%`;
        this.rightController.style.width = `${100-right}%`;
    };
};