import type { Application } from "pixi.js";
import type { ContainerManager } from "../Container/ContainerManager";

export class PixiLineChart {
    app: Application;
    labels;
    datasets;
    containerManager: ContainerManager;
    width;
    height;
    verticalMargin;
    horizontalMargin;
    

    constructor( app: Application, containerManager: ContainerManager ){
        this.app = app;
        this.labels = [];
        this.datasets = [];
        this.containerManager = containerManager;
    };

    attachBySelector( selector: string ){
        let dom = (document.querySelector( selector ) as HTMLElement);
        let view: HTMLCanvasElement = ( this.app.view as HTMLCanvasElement );

        dom.appendChild( view );
    };

    
}