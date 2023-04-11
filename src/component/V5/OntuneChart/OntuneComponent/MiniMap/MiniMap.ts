import { Chart, type ChartConfiguration, type ChartData, type ChartOptions, type ChartTypeRegistry } from "chart.js";

export class MiniMap {
    chart: Chart;
    canvas: HTMLCanvasElement;
    config: ChartConfiguration;
    leftController: HTMLElement;
    centerController: HTMLElement;
    rightController: HTMLElement;
    worker: Worker;

    private options: ChartOptions = {
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

        const offScreenCanvas = canvas.transferControlToOffscreen();

        this.worker = new Worker(new URL('./MinimapWorker.js', import.meta.url), {type: 'module'});
        this.worker.postMessage({offScreenCanvas, config: this.config});
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