import type { Object2D } from '../core/Object2D/Object2D';
import { Line } from '../core/Shape/Line';
import { PolyLine } from '../core/Shape/PolyLine';
import { Rectangle } from '../core/Shape/Rectangle';
import { Text } from '../core/Shape/Text';
import { Ontune2DAPI } from './api';
import type { Ontune2D } from './constructor'

export class ObjectAPI extends Ontune2DAPI {
    constructor( ontune2d: Ontune2D ){
        super( ontune2d );
    };

    getObjectById( id: string ){
        const ontune2d = this.ontune2d;

        let targetObject2d = null;
        ontune2d.scene.traverse(function( object2d: Object2D ){
            if( object2d.id === id ){
                targetObject2d = object2d;
                return false;
            }
        });
    
        return targetObject2d;
    };

    addRectangle( id: string ){
        const objectApi = this;
        const ontune2d = this.ontune2d;

        const object2d = objectApi.getObjectById( id );
        if( object2d ){
            console.log( `${id}가 중복됩니다.` );
            return;
        };
    
        const rectangle = new Rectangle( id );
        ontune2d.scene.add( rectangle );
    
        return rectangle;
    };  

    addLine( id: string ){
        const objectApi = this;
        const ontune2d = this.ontune2d;

        const object2d = objectApi.getObjectById( id );
        if( object2d ){
            console.log( `${id}가 중복됩니다.` );
            return;
        };
    
        const line = new Line( id );
        ontune2d.scene.add( line );
    
        return line;
    };

    addPolyLine( id: string ){
        const objectApi = this;
        const ontune2d = this.ontune2d;

        const object2d = objectApi.getObjectById( id );
        if( object2d ){
            console.log( `${id}가 중복됩니다.` );
            return;
        };
    
        const polyLine = new PolyLine( id );
        ontune2d.scene.add( polyLine );
    
        return polyLine;
    };

    addText( id: string, text: string ){
        const objectApi = this;
        const ontune2d = this.ontune2d;

        const object2d = objectApi.getObjectById( id );
        if( object2d ){
            console.log( `${id}가 중복됩니다.` );
            return;
        };
        
        const textObj = new Text( id, text );
        ontune2d.scene.add( textObj );
    
        return textObj;
    };

    addObject( object2d: Object2D ){
        const objectApi = this;
        const ontune2d = this.ontune2d;

        if( objectApi.getObjectById( object2d.id )){
            console.log( `${object2d.id}가 중복됩니다.` );
            return;
        };
        ontune2d.scene.add( object2d );
        return object2d;
    };

    removeObject( object2d: Object2D ){
        const ontune2d = this.ontune2d;

        ontune2d.scene.remove( object2d );
        return object2d;
    };
};