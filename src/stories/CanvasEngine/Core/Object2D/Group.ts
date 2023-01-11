import { Object2D } from "./Object2D";

export class Group extends Object2D {
    parent;
    children: Object2D[];
    isGroup: boolean = true;

    constructor( id: string ){
        super( id );
    };

    add( obj2d: Object2D ){
        this.children.push( obj2d );
    };

    remove( obj2d: Object2D ){
        for( let i=0; i<this.children.length; ++i ){
            let children = this.children[ i ];
            if( children === obj2d ){
                this.children.splice( i, 1 );
                this.parent = null;
                return true;
            }
        };
    };

    getObjectById( id: string ){
        for( let i=0; i<this.children.length; ++i ){
            let children = this.children[ i ];
            if( children.id === id ){
                return children;
            };
        };

        return null;
    };
}