import { Container as PixiContainer, Graphics } from "pixi.js";

export type ContainerOptions = {
    width: number,
    height: number,
    margin: number,
    x: number,
    y: number
}

export class Container {
    pixiContainer: PixiContainer = new PixiContainer();
    objects: Graphics[] = [];
    containerOptions: ContainerOptions = {
        width: 0,
        height: 0,
        margin: 0,
        x: 0,
        y: 0
    };

    constructor( containerOptions?: ContainerOptions ){
        containerOptions ? this.containerOptions = containerOptions : null;
    }
}