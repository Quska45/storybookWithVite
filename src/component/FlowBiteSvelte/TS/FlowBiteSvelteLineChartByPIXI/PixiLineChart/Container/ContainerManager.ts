import { Container, type ContainerOptions } from "./Container";

export class ContainerManager{
    xAexeConatainer: Container = new Container();
    yAexeConatainer: Container = new Container();
    chartMainConatainer: Container = new Container();

    constructor(){

    }

    setContainerById( id: string, containerOptions: ContainerOptions ){
        const manager = this;

        ( manager[ id ] as Container).containerOptions = containerOptions;
    };
}