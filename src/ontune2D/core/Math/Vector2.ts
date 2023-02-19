export class Vector2{
    x: number;
    y: number;

    constructor( x: number, y: number ){
        this.x = x;
        this.y = y;
    };

    set(  x: number, y: number  ){
        const vector2 = this;

        vector2.x = x;
        vector2.y = y;
    };
};