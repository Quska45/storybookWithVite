import { render, screen, fireEvent } from '@testing-library/svelte';
import LineChart from '../src/stories/LineChart.svelte'
import CanvasConatiner from './CanvasContainer.svelte'
import { Engine } from '../src/stories/CanvasEngine/API/Engine'
import { Vector } from '../src/stories/CanvasEngine/Core/Math/Vector';
import __getEvents from 'jest-canvas-mock';
import { LineChart as LineChartTS } from '../src/stories/TS/LineChart/LineChart';
import type { TConfig } from '../src/stories/TS/Common/Config';
import { TestUtil } from './TestUtil/TestUtil';

let props = {
    props: {
        containerId: 'canvasContainer1',
        config: {}
    }
}

describe('LineChart Container load test', ()=>{
    test.skip("LineChart load test by dom", () => {
        let lineChart = render(LineChart, props);
        let canvasContainer = lineChart.container.querySelector( '#canvasContainer1' );
    
        expect(canvasContainer).toBeInTheDocument();
    });
});

describe('canvas load test', () => {
    let lineChart;
    beforeEach(() => {
        lineChart = render(LineChart, props);
    });

    test.skip("canvas load test by dom", () => {
        let canvas = lineChart.container.querySelector( 'canvas' );
    
        expect(canvas).toBeInTheDocument();
    });

    test.skip('canvas draw test', async () => {
        let engine = new Engine( '#canvasContainer1' );

        engine.addLine( 'testLine', new Vector(2,2), new Vector(5,5) );
        engine.run();

        // const events = (engine.renderer.ctx as CanvasRenderingContext2D).__getEvents();
        const events = engine.renderer.ctx?.__getEvents();
        
        expect( events ).toMatchSnapshot();
    });

    /**
     * 성공할 수 없는 테스트.
     * requestAnimationFrame의 시간만 테스트 하는 것이 아니라 dom 로딩까지 같이 테스트 됨
    */
    test.skip('canvas draw speed test', async () => {
        let engine = new Engine( '#canvasContainer1' );

        for( let i=0; i<10000; ++i ){
            engine.addLine( 'testLine' + i.toString(), new Vector(2,2), new Vector(5,5) );
        };
        engine.run();

        expect( engine.RAF.fpms ).toBeLessThan( 16 );
    });
});

/**
 * 생각한 것 처럼 안됨. 나중에 다시 해볼 예정
*/
describe('RAF test', () => {
    let lineChart;
    let engine;

    beforeEach(() => {
        lineChart = render(LineChart, props);
    });
    
    test.skip('RAF basic test', () => {
        engine = new Engine( '#canvasContainer1' );
        jest.useFakeTimers();
        console.log( engine.RAF.fpms );
        jest.advanceTimersByTime( 3000 );
        console.log( engine.RAF.fpms );
    });

    afterEach(() => {
    });
});

/**
 * raf의 콜백이 jest 환경에서 무시되기 때문에 raf 자체를 모킹해서 쓰는 것이 최선 일듯?
*/
describe('requestAnimation mocking impl', () => {
    let requestAnimationFrameSpy: jest.SpyInstance<number, [callback: FrameRequestCallback]>;
    let lineChart;
    let engine: Engine;
    let canvasContainer;

    beforeEach(() => {
        lineChart = render(LineChart, props);
        canvasContainer = render(CanvasConatiner);
        engine = new Engine( '#canvasContainer1' );


        let time = 0;
        requestAnimationFrameSpy = jest.spyOn(window, 'requestAnimationFrame')
        .mockImplementation((callback: FrameRequestCallback): number => {
            let start = new Date();
            callback(time);
            let end = new Date();
            return end.getTime()-start.getTime();
        });
    });
    
    test.skip('RAF basic test', () => {
        const order: number[] = [];
        
        expect(order).toEqual([]);
        requestAnimationFrame(t => order.push(1));
        console.log(order);
        expect(order).toEqual([1]);
        requestAnimationFrame(t => order.push(1));
        console.log(order);
        expect(order).toEqual([1,1]);
    });

    test.skip('RAF basic2 test', () => {
        const order: number[] = [];
        
        expect(order).toEqual([]);
        requestAnimationFrame(t => {order.push( t ); console.log(t)});
        expect(order[0]).toEqual(1000);
        requestAnimationFrame(t => {order.push( t ); console.log(t)});
        expect(order[1]).toEqual(1000);
    });

    test.skip('RAF time test', () => {
        let returnValue = requestAnimationFrame(t => {console.log(t)});
        expect(returnValue).toBeLessThan(60);
    });

    /**
     * 엔진으로 30프레임 렌더링 가능한 최대 값을 구하는 테스트
     * 1000 - 2000개 사이로 가능
    */
    test.skip('RAF time test with engine. 렌더링 가능한 최대 값 구하기', () => {
        function run(){
            for( let i=0; i<1000; ++i ){
                engine.addLine(i.toString(), new Vector(2,2), new Vector(5,5));
            };

            engine.renderer.render( engine.scene );
        };

        let returnValue = requestAnimationFrame( run );
        expect(returnValue).toBeLessThan(48);
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
        expect(returnValue).toBeLessThan(48);
    });

    afterEach(() => {
        requestAnimationFrameSpy.mockRestore();
    });
});

/**
 * jest로 만든 테스트 환경에서 raf의 콜백은 처리될 수 없음.
 * 따라서 'requestAnimation mocking impl' 처럼 raf 자체를 모킹해서 raf가 실행될 수 있도록 만드는 것이 사실상 최선이라고 보여짐
*/
describe('requestAnimation not mocking impl', () => {
    test.skip('RAF basic test', () => {
        const order: number[] = [];
        
        expect(order).toEqual([]);
        requestAnimationFrame(t => {order.push(1);});
        expect(order).toEqual([1]);
    })
});


describe('LineChart.ts test', () => {
    let canvasContainer;

    beforeEach(() => {
        canvasContainer = render(CanvasConatiner);
    });

    test('TConfig 인자에 빈 값 넣기', () => {

        let config: TConfig = {
            type: 'line',
            data: {
                labels: [],
                datasets: []
            },
            options: {
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    title: {
                        display: true,
                        text: ''
                    }
                }
            }
        };

        let props = {
            props: {
                containerId: 'canvasContainer1',
                config: config
            }       
        };

        let lineChart = render(LineChart, props);

        expect( lineChart.container.querySelector('canvas') ).toBeInTheDocument();
    })
});