import type { Ontune2D } from '../api/constructor'
import { Vector2 } from '../core/Math/Vector2';
import type { Object2D } from '../core/Object2D/Object2D';

export type TMouseControl = {
    isEnable: boolean,
    isEnableMousearea: boolean, // 마우스 영역 사용 여부
    isEnableMousemove: boolean, // 마우스 이동 사용 여부
    isEnableMouserotate: boolean, // 마우스 회전 사용 여부
    isEnableMousezoom: boolean, // 마우스 줌 사용 여부
    isEnableMousemoveByMousezoom: boolean, // 마우스 확대 시, 이동 여부
    
    // 판단
    isDraged: boolean, // 현재 드래그 여부
    
    button: number, // 누르고 있는 버튼
    downPageXy: Vector2, // 다운 당시 page 좌표
    beforePageXy: Vector2, // 이전 page 좌표
    downXy: Vector2, // 버튼을 눌렀을 당시 좌표
    beforeCameraRotation: Vector2, // 회전 전 카메라 회전값
    
    isReverseButton: boolean, // 버튼 맵핑 반대 여부

    selectBox: Object2D;
};

export const getSelectBox = function( ontune2d: Ontune2D ){
    const sb = ontune2d.addRectangle("ontune2d.selectBox");
    sb.isFixedLineWidth = true;
    sb.fillStyle = "rgba( 255, 0, 0, 0.2 )";
    // sb.strokeStyle = "#ff0000";
    sb.lineWidth = 1;
    sb.zIndex = 99999;
    sb.isScan = false;
    ontune2d.scene.remove( sb );
    return sb;
};

/**
    확대, 축소, 이동 관련 마우스 이벤트 등록
**/
export const DownAction = {
    "0": function showSelector( e, ontune2d: Ontune2D ){
        const selectBox = ontune2d.mouseControl.selectBox;
        selectBox.scale.set( 0, 0 );
        ontune2d.scene.add( selectBox );
    },
    "2": function (){}
};

export const UpAction = {
    "0": function hideSelector( e ){},
    "1": function hideSelector( e ){},
    "2": function hideSelector( e ){}
};

export const DragAction = {
    "0": function selector( e, ontune2d: Ontune2D ){
        
        if( ontune2d.mouseControl.isEnableMousearea === false ){
            return;
        };

        const selectBox = ontune2d.mouseControl.selectBox;
        
        const dragXy = getMouseXy( ontune2d );
        
        const width = dragXy.x - ontune2d.mouseControl.downXy.x;
        const height = dragXy.y - ontune2d.mouseControl.downXy.y;
        
        selectBox.position.x = ontune2d.mouseControl.downXy.x + width / 2;
        selectBox.position.y = ontune2d.mouseControl.downXy.y + height / 2;
        selectBox.scale.x = width;
        selectBox.scale.y = height;
    },
    "2": function translate( e, ontune2d: Ontune2D ){
        
        if( ontune2d.mouseControl.isEnableMousemove === false ){
            return;
        }
        
        // 마우스가 얼마나 움직였는지에 대한 값
        const moveX = ontune2d.mouseControl.beforePageXy.x - e.pageX;
        const moveY = ontune2d.mouseControl.beforePageXy.y - e.pageY;
        
        const vector2 = new Vector2( moveX, moveY );
        const rM = ontune2d.camera.rotation.getRotateMatrix3();
        vector2.multiplyMatrix3( rM );
        
        ontune2d.camera.position.x += ontune2d.scene.qudrantSystem.x * vector2.x / ontune2d.camera.scale.x;
        ontune2d.camera.position.y += -ontune2d.scene.qudrantSystem.y * vector2.y / ontune2d.camera.scale.y;
    }
};

export function onMousedown( e, ontune2d: Ontune2D ){
    if( ontune2d.mouseControl.isEnable === false ){
        return;
    }
    
    e.preventDefault();
    // if( ontune2d.mouseControl.isReverseButton === true ){
    //     e = changeButtonEvent( e );
    // }
    
    const downXy = getMouseXy( ontune2d );
    ontune2d.mouseControl.button = e.button;
    
    // 버튼 별 동작 처리
    DownAction[ e.button ]( e, ontune2d );
    
    ontune2d.mouseControl.downXy.x = downXy.x;
    ontune2d.mouseControl.downXy.y = downXy.y;
    
    ontune2d.mouseControl.beforePageXy.x = e.pageX;
    ontune2d.mouseControl.beforePageXy.y = e.pageY;

    ontune2d.mouseControl.downPageXy.x = e.pageX;
    ontune2d.mouseControl.downPageXy.y = e.pageY;
    
    ontune2d.event.executeCallback( "mousedown", e, downXy.x, downXy.y );
};

export function onMousemove( e, ontune2d: Ontune2D ){
    if( ontune2d.mouseControl.isEnable === false ){
        return;
    }
    
    e.preventDefault();
    // if( ontune2d.mouseControl.isReverseButton === true ){
    //     e = changeButtonEvent( e );
    // }
    
    if( ontune2d.mouseControl.button != null ){
        
        const isDragX = Math.abs( ontune2d.mouseControl.downPageXy.x - e.pageX ) > 1;
        const isDragY = Math.abs( ontune2d.mouseControl.downPageXy.y - e.pageY ) > 1;
        
        if( isDragX || isDragY ){
            ontune2d.mouseControl.isDraged = true;
            DragAction[ ontune2d.mouseControl.button ]( e, ontune2d );
        }
    }
    
    ontune2d.mouseControl.beforePageXy.x = e.pageX;
    ontune2d.mouseControl.beforePageXy.y = e.pageY;
    
    const moveXy = getMouseXy( ontune2d );
    ontune2d.event.executeCallback( "mousemove", e, moveXy.x, moveXy.y );
};

export function onMouseUp( e, ontune2d: Ontune2D ){
    if( ontune2d.mouseControl.isEnable === false ){
        return;
    }
    
    e.preventDefault();
    // if( ontune2d.mouseControl.isReverseButton === true ){
    //     e = changeButtonEvent( e );
    // }
    
    const upXy = getMouseXy( ontune2d );
    const selectBox = ontune2d.mouseControl.selectBox;

    // 선택 영역 제거
    ontune2d.scene.remove( selectBox );
    
    // 버튼 별 동작 처리
    UpAction[ e.button ]( e );
    if( ontune2d.mouseControl.isDraged === true ){
        
        if( ontune2d.mouseControl.isEnableMousearea === true ){
            if( e.button === 0 ){
                const minX = Math.min( ontune2d.mouseControl.downXy.x, upXy.x );
                const minY = Math.min( ontune2d.mouseControl.downXy.y, upXy.y );
                const maxX = Math.max( ontune2d.mouseControl.downXy.x, upXy.x );
                const maxY = Math.max( ontune2d.mouseControl.downXy.y, upXy.y );
                ontune2d.event.executeCallback( "mousearea", e, minX, minY, maxX, maxY );
            }
        }
        ontune2d.event.executeCallback( "mouseup", e, upXy.x, upXy.y );
    
    }else{
        ontune2d.event.executeCallback( "mouseup", e, upXy.x, upXy.y );
        ontune2d.event.executeCallback( "click", e, upXy.x, upXy.y );
    }
    
    // 마우스 객체 초기화
    ontune2d.mouseControl.isDraged = false;
    ontune2d.mouseControl.button = null;
};

export function onContextmenu( e ){
    e.preventDefault();
};



export function getMouseXy( ontune2d: Ontune2D, _addX?: number, _addY?: number ){
    const addX = _addX || 0;
    const addY = _addY || 0;

    const canvasWidth = ontune2d.renderer.canvas.width;
    const canvasHeight = ontune2d.renderer.canvas.height;

    const scaleX = ontune2d.camera.scale.x;
    const scaleY = ontune2d.camera.scale.y;

    const positionX = ontune2d.camera.position.x;
    const positionY = ontune2d.camera.position.y;

    const pointerX = ontune2d.mouseControl.beforePageXy.x + addX - ontune2d.renderer.boundingClientRect.left;
    const pointerY = ontune2d.mouseControl.beforePageXy.y + addY - ontune2d.renderer.boundingClientRect.top;

    const quadrantSystemX = ontune2d.scene.qudrantSystem.x;
    const quadrantSystemY = -1 * ontune2d.scene.qudrantSystem.y;

    const centerX = pointerX - canvasWidth / 2;
    const centerY = pointerY - canvasHeight / 2;

    const sX = centerX / scaleX;
    const sY = centerY / scaleY;

    const vector2 = new Vector2( sX, sY );
    
    const rM = ontune2d.camera.rotation.getRotateMatrix3();
    vector2.multiplyMatrix3( rM );
    
    const tX = vector2.x + quadrantSystemX * positionX;
    const tY = vector2.y + quadrantSystemY * positionY;
    
    return new Vector2( quadrantSystemX * tX, quadrantSystemY * tY );
};