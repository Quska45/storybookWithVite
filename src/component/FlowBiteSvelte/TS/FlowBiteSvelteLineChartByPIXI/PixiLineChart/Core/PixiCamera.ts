import type { Application } from "pixi.js";

export class PixiCamera {
    app: Application;
    container;

    constructor( app: Application ){
        this.app = app;
    };
}