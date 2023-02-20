import type { Object2D } from '../core/Object2D/Object2D';
import { Line } from '../core/Shape/Line';
import { Rectangle } from '../core/Shape/Rectangle';
import type { Ontune2D } from './constructor'

export function getObjectById( ontune2d: Ontune2D, id: string ){
    let targetObject2d = null;
    ontune2d.scene.traverse(function( object2d: Object2D ){
		if( object2d.id === id ){
			targetObject2d = object2d;
			return false;
		}
	});

    return targetObject2d;
};

export function addRectangle( ontune2d: Ontune2D, id: string ){
    const object2d = getObjectById( ontune2d, id );
    object2d ? console.log( `${id}가 중복됩니다.` ) : null;

    const rectangle = new Rectangle( id );
    ontune2d.scene.add( rectangle );

    return rectangle;
};

export function addLine( ontune2d: Ontune2D, id: string ){
    const object2d = getObjectById( ontune2d, id );
    object2d ? console.log( `${id}가 중복됩니다.` ) : null;

    const line = new Line( id );
    ontune2d.scene.add( line );

    return line;
};