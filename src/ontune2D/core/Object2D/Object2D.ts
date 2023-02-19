import { Vector2 } from "../Math/Vector2";

export class Object2D {
    id: string;
    scale: Vector2;
    position: Vector2;
    rotation: Vector2;
    opacity: number;
    zIndex: number;
    // 객체가 선택되어야 하는 범위에 대한 속성. 객체의 모양이 다양해 질 수록 선택되어야 범위의 복잡성이 증가함.
    selectRange: { x: number[], y: number[] };
    handleScale: Vector2;
    // 실질적으로 Group에서만 사용되는 속성. Group 내부에 있는 children 객체 간의 zIndex로 사용될 수 있음
    depth: number;

    // 카메라를 비롯한 엔진의 다른 요소에 의해 scale 변화가 일어나지 않도록 하는 flag
    isFixedSize: boolean;
    isScan: boolean;

    userData: any;

    constructor( id ){
        this.id = id;
        this.scale = new Vector2( 1, 1 );
        this.position = new Vector2( 0, 0 );
        this.rotation = new Vector2( 0, 0 );
        this.isScan = true;
        this.opacity = 1;
        // 차지하는 영역이 아예 없는 상태를 의미함.
        this.selectRange = {
            x: [0, 0],
            y: [0, 0]            
        };
        this.handleScale = new Vector2( 1, 1 );
        this.isFixedSize = false;
    };

    // degree to radian
    setDegree( deg ){
        const rad = deg * Math.PI / 180;
        this.rotation.set( rad, rad );
    };

    // interface의 개념. 하위 객체들은 updateHandle을 구현해서 사용.
    updateHandle(){};
};
