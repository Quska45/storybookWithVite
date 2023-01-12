import { Vector } from '../Math/Vector';
import { Quadrant } from './Scene';

export class Object2D {
    id: string;
    scale: Vector = new Vector( 1, 1 );
    position: Vector = new Vector( 0, 0 );
    rotation: Vector = new Vector( 0, 0 );;
    opacity: number;

    constructor( id: string ){
        this.id = id;
    };

    getPositionCoordinate( quadrant: Quadrant, canvas: HTMLCanvasElement ){
        if( quadrant === Quadrant.quadrant1 ){
            return { x: this.position.x, y: -this.position.y + canvas.height };
        } else if( quadrant === Quadrant.quadrant2 ){
            return { x: this.position.x, y: this.position.y };
        } else if( quadrant === Quadrant.quadrant3 ){
            return { x: -this.position.x + canvas.width, y: this.position.y };
        } else if( quadrant === Quadrant.quadrant4 ){
            return { x: -this.position.x + canvas.width, y: -this.position.y + canvas.height };
        };
    };

    getPositionCoordinateByPosition( quadrant: Quadrant, canvas: HTMLCanvasElement, position: Vector ){
        if( quadrant === Quadrant.quadrant1 ){
            return { x: position.x, y: -position.y + canvas.height };
        } else if( quadrant === Quadrant.quadrant2 ){
            return { x: position.x, y: position.y };
        } else if( quadrant === Quadrant.quadrant3 ){
            return { x: -position.x + canvas.width, y: position.y };
        } else if( quadrant === Quadrant.quadrant4 ){
            return { x: -position.x + canvas.width, y: -position.y + canvas.height };
        };
    };

    setPosition( x: number, y: number ){
        this.position.x = x;
        this.position.y = y;
    };

    // 2d 객체를 그리는 기능. 하위 객체는 이 메서드를 반드시 오버라이딩 해야함.
    drawn( ctx: CanvasRenderingContext2D, quadrant: Quadrant, canvas: HTMLCanvasElement ){};
};