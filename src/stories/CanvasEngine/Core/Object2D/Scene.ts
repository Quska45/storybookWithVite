import { Vector } from "../Math/Vector";
import { Group } from "./Group";

export class Scene extends Group {
    CSD = new Vector( 1,1 );

    constructor( id: string ){
        super( id );
    };
};