import { Vector } from '../Math/Vector';

export class Object2D {
    id: string;
    scale: Vector = new Vector( 1, 1 );
    position: Vector = new Vector( 0, 0 );
    rotation: Vector = new Vector( 0, 0 );;
    opacity: number;

    constructor( id: string ){
        this.id = id;
    };

    // 2d 객체를 그리는 기능. 하위 객체는 이 메서드를 반드시 오버라이딩 해야함.
    drawn( ctx: CanvasRenderingContext2D ){}
}