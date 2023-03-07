import { Ontune2DAPI } from "./api";
import type { Ontune2D } from "./constructor";

export class CameraAPI extends Ontune2DAPI {
    constructor( ontune2d: Ontune2D ){
        super( ontune2d );
    };

    moveCamera( x: number, y: number ){
        const ontune2d = this.ontune2d;

        ontune2d.camera.position.set( x, y );
    };

    zoomInCamera(){
        const ontune2d = this.ontune2d;

        const magnification = ontune2d.ENV.camera.magnification;
        ontune2d.camera.scale.x *= magnification;
        ontune2d.camera.scale.y *= magnification;
    };

    zoomOutCamera(){
        const ontune2d = this.ontune2d;

        const magnification = ontune2d.ENV.camera.magnification;
        ontune2d.camera.scale.x /= magnification;
        ontune2d.camera.scale.y /= magnification;
    };
};