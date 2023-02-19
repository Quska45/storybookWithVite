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

    static getValueByQuadrant( quadrant, value, canvas ){
        if( quadrant === 1 ){
            return { x: value.x, y: -value.y * 2 + canvas.height };
        } else if( quadrant === 2 ){
            return { x: value.x, y: value.y };
        } else if( quadrant === 3 ){
            return { x: -value.x*2 + canvas.width, y: value.y };
        } else if( quadrant === 4 ){
            return { x: -value.x*2 + canvas.width, y: -value.y*2 + canvas.height };
        };
    };

    attachBySelector( selector: string ){
        let dom = (document.querySelector( selector ) as HTMLElement);
        let view: HTMLCanvasElement = ( this.app.view as HTMLCanvasElement );

        dom.appendChild( view );
    };

    
}