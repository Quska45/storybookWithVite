import { Vector2 } from "../core/Math/Vector2";
import type { Object2D } from "../core/Object2D/Object2D";
import { Scene } from "../core/Object2D/Scene";
import { Camera } from "../core/Viewer/Camera";
import { Renderer } from "../core/Viewer/Renderer";
import { env } from "../env/env";
import { getSelectBox, onContextmenu, onMousedown, onMousemove, onMouseUp, type TMouseControl } from "../plugin/MouseControl";
import { CameraAPI } from "./camera";
import { on, off } from "./event";
import { ObjectAPI } from "./object";
import { RendererAPI } from "./renderer";

export class Ontune2D {
    renderer: Renderer;
    scene: Scene;
    camera: Camera;
    ENV: typeof env;
    RAF: { rendering: number };
    event: {
        sequence: number,
        beforeRender: Object,
        afterRender: Object,
        resize: Object,
        executeCallback: Function
    };
    mouseControl: TMouseControl;
    rendererAPI: RendererAPI;
    objectAPI: ObjectAPI;
    cameraAPI: CameraAPI;

    constructor( selector ){
        this.ENV = env;
        this.renderer = new Renderer( 'Ontune2D.Renderer:' + selector, selector );
        this.scene = new Scene( 'Ontune2D.Scene:' + selector );
        this.camera = new Camera( 'Ontune2D.Camera:' + selector );
        this.camera.position.x = this.ENV.camera.startPosition.x;
        this.camera.position.y = this.ENV.camera.startPosition.y;

        this.RAF = {
            rendering: null
        };

        this.rendererAPI = new RendererAPI( this );
        this.objectAPI = new ObjectAPI( this );
        this.cameraAPI = new CameraAPI( this );

        this.mouseControl = {
            isEnable: false,
            isEnableMousearea: true, // 마우스 영역 사용 여부
            isEnableMousemove: true, // 마우스 이동 사용 여부
            isEnableMouserotate: false, // 마우스 회전 사용 여부
            isEnableMousezoom: true, // 마우스 줌 사용 여부
            isEnableMousemoveByMousezoom: true, // 마우스 확대 시, 이동 여부
            
            // 판단
            isDraged: false, // 현재 드래그 여부
            
            button: null, // 누르고 있는 마우스 버튼
            downPageXy: new Vector2( 0, 0 ), // 다운 당시 page 좌표
            beforePageXy: new Vector2( 0, 0 ), // 이전 page 좌표
            downXy: new Vector2( 0, 0 ), // 버튼을 눌렀을 당시 좌표
            beforeCameraRotation: new Vector2( 0, 0 ), // 회전 전 카메라 회전값
            
            isReverseButton: false, // 버튼 맵핑 반대 여부

            selectBox: getSelectBox( this ),
        }

        this.event = Object.create(Object.prototype, {
		
            // 콜백 등록 시컨스
            sequence : {
                value: 0,
                writable: true
            },
    
            // 렌더 전 콜백 ()
            beforeRender: {
                value: {},
                enumerable: true,
                writable: true
            },
            
            // 렌더 후 콜백 ()
            afterRender: {
                value: {},
                enumerable: true,
                writable: true
            },
            
            resize: {
                value: {},
                enumerable: true,
                writable: true
            },

            // mouse event
            mousedown: {},
            mouseup: {},
            mousemove: {},
            click: {},  
            mousearea: {},
            // mousewheel: {},
            // mouseenter: {},
            // mouseleave: {},
            
            /*
                @USE
                     sgk2d.event.executeCallback( String _type, ? _args... )
                @DESC
                    콜백 실행기
                @PARAM
                    _type: sgk2d.event에 프로퍼티
                    _args...: 각 콜백마다 전달 파라미터가 다르므로, 2번째 인자부터는 각 콜백 특성에 따라 자유롭게 전달
                @SAMPLE
                    클릭된 시점에 해당 함수 실행
                    sgk2d.event.executeCallback( click, e, x, y );
             */
            executeCallback: {
                value: function executeCallback ( _type, _args ){
                    
                    const type = Array.prototype.shift.call( arguments );
                    const callbacks = this[ type ];
                    for( const eventSeq in callbacks ){
                        callbacks[ eventSeq ].apply( null, arguments );
                    }
                    
                }
            }
        });
    };

    // event api
    on( type: string, callback: Function ){ on( this, type, callback ); };
    off( reqSequence: number ){ off( this, reqSequence ) };

    // renderer api
    run(){ this.rendererAPI.run() };
    stop(){};
    setQuadrantSystem( quadrant: number ){};
    resize(){ this.rendererAPI.resize() };
    getCanvasSize(){ return this.rendererAPI.getCanvasSize() };

    // camera api
    moveCamera( x: number, y: number ){ this.cameraAPI.moveCamera( x, y ); };
    rotate( angle: number, isDgree: number ){};
    zoomInCamera(){ this.cameraAPI.zoomInCamera(); };
    zoomOutCamera(){ this.cameraAPI.zoomOutCamera(); };
    getCameraBoundary(){};

    // object api
    addRectangle( id: string ){ return this.objectAPI.addRectangle( id ); };
    addLine( id: string ){ return this.objectAPI.addLine( id ); };
    addText( id: string, text: string ){ return this.objectAPI.addText(id, text); };
    addObject( object2d: Object2D ){ return this.objectAPI.addObject( object2d ) };
    addPolyLine( id: string ){ return this.objectAPI.addPolyLine( id ); }

    // mouseControlPlugin
    startMouseControl(){
        const ontune2d = this;

        ontune2d.mouseControl.isEnable = true;
        ontune2d.renderer.container.addEventListener('mousedown', ( e ) => { onMousedown(e, ontune2d) });
        ontune2d.renderer.container.addEventListener('mousemove', ( e ) => { onMousemove(e, ontune2d) });
        ontune2d.renderer.container.addEventListener('mouseup', ( e ) => { onMouseUp(e, ontune2d) });
        ontune2d.renderer.container.addEventListener('contextmenu', ( e ) => { onContextmenu(e) });
    };
};