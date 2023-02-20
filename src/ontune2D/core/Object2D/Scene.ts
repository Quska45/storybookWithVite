import { Vector2 } from "../Math/Vector2";
import { Group } from "./Group";

export class Scene extends Group {
    qudrantSystem: Vector2;

    constructor( id ){
        super( id );

        /*
            좌표 증가 방향. 사분면 개념. default는 1사분면으로 세팅
            [2] -1,1  | [1] 1,1
            --------------------
            [3] -1,-1 | [4] 1,-1
        */
        this.qudrantSystem = new Vector2( 1, 1 );
    };

    setQudrantSystem( x: number, y: number ){
        const scene = this;

        if( x > 0 ){
            scene.qudrantSystem.x = 1;
        }else if( x < 0 ){
            scene.qudrantSystem.x = -1;
        }
        if( y > 0 ){
            scene.qudrantSystem.y = 1;
        }else if( y < 0 ){
            scene.qudrantSystem.y = -1;
        }
    };
};