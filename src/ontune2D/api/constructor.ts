import { Scene } from "../core/Object2D/Scene";
import { Camera } from "../core/Viewer/Camera";
import { Renderer } from "../core/Viewer/Renderer";
import { env } from "../env/env";
import { on, off } from "./event";
import { run, resize, setQuadrantSystem, stop } from "./renderer";

export class Ontune2D {
    rederer: Renderer;
    scene: Scene;
    camera: Camera;
    ENV: typeof env;
    event: {
        sequence: number,
        beforeRender: Object,
        afterRender: Object,
        resize: Object,
        executeCallback: Object
    };

    constructor( selector ){
        this.ENV = env;
        this.rederer = new Renderer( 'Ontune2D.Rederer:' + selector, selector );
        this.scene = new Scene( 'Ontune2D.Scene:' + selector );
        this.camera = new Camera( 'Ontune2D.Camera:' + selector );
        this.camera.position.x = this.ENV.camera.startPosition.x;
        this.camera.position.y = this.ENV.camera.startPosition.y;

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
    on( type: string, callback: Function ){}
    off( reqSequence: number ){}

    // renderer api
    run(){};
    stop(){};
    setQuadrantSystem( quadrant: number ){};
    resize(){};

    // camera api
    moveCamera( x: number, y: number ){};
    rotate( angle: number, isDgree: number ){};
    zoomInCamera(){};
    zoomOutCamera(){};
    getCameraBoundary(){};
};

// event api
Ontune2D.prototype.on = on;
Ontune2D.prototype.off = off;

// renderer api
Ontune2D.prototype.run = run;
Ontune2D.prototype.stop = stop;
Ontune2D.prototype.setQuadrantSystem = setQuadrantSystem;
Ontune2D.prototype.resize = resize;