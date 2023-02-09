import { Vector } from '../src/stories/CanvasEngine/Core/Math/Vector';


/**
 * raf의 콜백이 jest 환경에서 무시되기 때문에 raf 자체를 모킹해서 쓰는 것이 최선 일듯?
*/
describe('requestAnimation mocking impl', () => {
    let requestAnimationFrameSpy: jest.SpyInstance<number, [callback: FrameRequestCallback]>;

    beforeEach(() => {

        let time = 0;
        requestAnimationFrameSpy = jest.spyOn(window, 'requestAnimationFrame')
        .mockImplementation((callback: FrameRequestCallback): number => {
            let start = new Date();
            callback(time);
            let end = new Date();
            return end.getTime()-start.getTime();
        });
    });
    
    /**
     * 엔진없이 30프레임 렌더링 가능한 최대 값을 구하는 테스트
     * 2000 - 3000개 사이로 가능
    */
    test.skip('RAF time test without engine. 엔진 없이 렌더링 가능한 최대 값 구하기', () => {
        let canvas = document.createElement( 'canvas' );
        let ctx = canvas.getContext( '2d' );
        
        function run(){
            for( let i=0; i<2000; ++i ){
                ctx.beginPath();
                ctx.strokeStyle = '#000000';
                ctx.fillStyle = 'rgba(0,0,0,1)';
                ctx.moveTo( 2, 2 );
                ctx.lineTo( 5, 5 );
                ctx.stroke();
                ctx.closePath();
            };
        };

        let returnValue = requestAnimationFrame( run );
        expect(returnValue).toBeLessThan(32);
    });

    /**
     * 복수 / 단수의 라인으로 그리기
    */
    test('RAF time test without engine. 엔진 없이 렌더링 가능한 최대 값 구하기', () => {
        let canvas = document.createElement( 'canvas' );
        let ctx = canvas.getContext( '2d' );
        
        function run(){
            for( let i=0; i<2000; ++i ){
                ctx.beginPath();
                ctx.strokeStyle = '#000000';
                ctx.fillStyle = 'rgba(0,0,0,1)';
                ctx.moveTo( 2, 2 );
                ctx.lineTo( 5, 5 );
                ctx.stroke();
                ctx.closePath();

                ctx.beginPath();
                ctx.strokeStyle = '#000000';
                ctx.fillStyle = 'rgba(0,0,0,1)';
                ctx.moveTo( 5, 5 );
                ctx.lineTo( 8, 8 );
                ctx.stroke();
                ctx.closePath();

                ctx.beginPath();
                ctx.strokeStyle = '#000000';
                ctx.fillStyle = 'rgba(0,0,0,1)';
                ctx.moveTo( 8, 8 );
                ctx.lineTo( 10, 10 );
                ctx.stroke();
                ctx.closePath();
            };
        };

        let returnValue = requestAnimationFrame( run );
        console.log('returnValue', returnValue);
        expect(returnValue).toBeLessThan(120);

        //구분 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

        let canvas2 = document.createElement( 'canvas' );
        let ctx2 = canvas2.getContext( '2d' );
        
        function run2(){
            for( let i=0; i<2000; ++i ){
                ctx2.beginPath();
                ctx2.strokeStyle = '#000000';
                ctx2.fillStyle = 'rgba(0,0,0,1)';
                ctx2.moveTo( 2, 2 );
                ctx2.lineTo( 5, 5 );
                ctx2.lineTo( 8, 8 );
                ctx2.lineTo( 10, 10 );
                ctx2.stroke();
                ctx2.closePath();
            };
        };

        let returnValue2 = requestAnimationFrame( run2 );
        console.log('returnValue2', returnValue2);
        expect(returnValue2).toBeLessThan(120);
    });

    afterEach(() => {
        requestAnimationFrameSpy.mockRestore();
    });
});
