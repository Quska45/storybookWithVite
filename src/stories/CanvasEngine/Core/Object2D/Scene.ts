import { Vector } from "../Math/Vector";
import { Group } from "./Group";

export const enum Quadrant {
    quadrant1 = 1,
    quadrant2 = 2,
    quadrant3 = 3,
    quadrant4 = 4
};

export class Scene extends Group {
    quadrant: Quadrant;

    constructor( id: string ){
        super( id );
    };

    setCSD( quadrant: Quadrant ){
        this.quadrant = quadrant;
    };
};