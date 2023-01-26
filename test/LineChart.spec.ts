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
        expect(returnValue).toBeLessThan(32);
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

    test.skip('TConfig 인자에 빈 값 넣기', () => {

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

describe('y 축 데이터 만들기 테스트', () => {
    let config = {
        type: {},
        data: {
            labels: ['1','2','3','4','5','6','7','8'],
            datasets: [{
            label: '1',
            data: [80, -19, 7, -65, -50, -20, -11],
            fill: true,
            borderColor: '',
            tension: 0
            }, {
                label: '2',
                data: [4, 61, -87, 10, -79, -40, 40],
                fill: true,
                borderColor: '',
                tension: 0
            }]
        },
        options: {}
    };
    let fullArr: any[];

    beforeEach(() => {
        fullArr = config.data.datasets.reduce(( acc, cur ) => {
            acc = [ ...acc, ...cur.data ]

            return acc;
        }, []);
    });

    test.skip('y 축 데이터 최대값 구하기', () => {
        let maxValue = 0;
        maxValue = Math.max.apply(null, fullArr);

        expect(maxValue).toEqual(80);
    });

    test.skip('y 축 데이터 최소값 구하기', () => {
        let minValue = 0
        minValue = Math.min.apply(null, fullArr)

        expect(minValue).toEqual(-87);
    });

    test.skip('y 축 전체 데이터의 최대값이 80 이하인 경우 최대값 구하기', () => {
        let expectResult = 0
        let maxValue = Math.max.apply(null, fullArr);
        let maxValueRemainder = maxValue / 10;

        if( maxValueRemainder / 10 > 0 && maxValueRemainder / 10 < 0 ){
            let numStr = maxValue.toString();
            let numDigit = numStr.length + 1;
            expectResult = parseInt('1'.padEnd(numDigit, '0'));
        } else {
            expectResult = maxValue
        };
        
        expect(expectResult).toEqual(80);
    });

    test.skip('y 축 전체 데이터의 최대값이 91인 경우 최대값 구하기', () => {
        let expectResult = 0
        let maxValue = Math.max.apply(null, [91]);
        let maxValueRemainder = maxValue / 10;

        if( maxValueRemainder > 0 && maxValueRemainder < 10 ){
            let numStr = maxValue.toString();
            let numDigit = numStr.length + 1;
            let addNum = parseInt('1'.padEnd(numDigit, '0'))/5;
            expectResult = maxValue + addNum
        } else {
            expectResult = maxValue
        };
        
        expect(expectResult).toEqual(100);
    });

    test.skip('y 축 전체 데이터 구하기', () => {
        let expectResult = []

        expect(expectResult).toEqual([-100, -80, -60, -40, -20, 0, 20, 40, 60, 80]);
    });
});

describe('line chart y axis 알고리즘', () => {
    var calcStepSize = function(range, targetSteps) {
        // calculate an initial guess at step size
        var tempStep = range / targetSteps;

        // get the magnitude of the step size
        var mag = Math.floor(Math.log(tempStep) / Math.LN10);
        var magPow = Math.pow(10, mag);

        // calculate most significant digit of the new step size
        var magMsd = Math.round(tempStep / magPow + 0.5);

        // promote the MSD to either 1, 2, or 5
        if (magMsd > 5.0)
            magMsd = 10.0;
        else if (magMsd > 2.0)
            magMsd = 5.0;
        else if (magMsd > 1.0)
            magMsd = 2.0;

        return magMsd * magPow;
    };

    function getDataArr( max: number, min: number, range: number, stepSize: number ){
        let rangeShare = Math.ceil( range / stepSize );
        let isMaxPositive = Math.sign( min ) >= 0 ? true : false;
        let isMinPositive = Math.sign( min ) >= 0 ? true : false;
        let startPoint = Math.ceil( min / rangeShare );
        let endPoint = Math.ceil( max / rangeShare );

        if( isMaxPositive ){
            endPoint = Math.ceil( max / rangeShare ) * stepSize;
        } else {
            endPoint = Math.floor( max / rangeShare ) * stepSize;
        };

        if( isMinPositive ){
            startPoint = Math.ceil( min / rangeShare ) * stepSize;
        } else {
            startPoint = Math.floor( min / rangeShare ) * stepSize;
        };

        let dataArr = [];
        let whileEndValue = 0;
        let whileIndex = 0;
        while( whileEndValue != endPoint ){
            whileEndValue = startPoint + (stepSize * whileIndex);
            dataArr.push( whileEndValue );
            whileIndex++;
        };

        return dataArr;
    };

    let config = {
        type: {},
        data: {
            labels: ['1','2','3','4','5','6','7','8'],
            datasets: [
                {
                    label: '1',
                    data: [-1,-2,-3,-4,-5,-6,-7,-8],
                    fill: true,
                    borderColor: '',
                    tension: 0
                },
                {
                    label: '2',
                    data: [10,20,30,40,50,60,70,91],
                    fill: true,
                    borderColor: '',
                    tension: 0
                }
            ]
        },
        options: {}
    };
    let fullArr: any[];

    beforeEach(() => {
        fullArr = config.data.datasets.reduce(( acc, cur ) => {
            acc = [ ...acc, ...cur.data ]

            return acc;
        }, []);
    });

    test.skip('calcStepSize 테스트', () => {
        let maxValue = Math.max.apply(null, fullArr);
        let minValue = Math.min.apply(null, fullArr);
        let range = maxValue - minValue
        let stepSize = calcStepSize( range, 10 );

        function addDataTexts( max: number, min: number, range: number, stepSize: number ){
            let rangeShare = Math.ceil( range / stepSize );
            let isMaxPositive = Math.sign( min ) >= 0 ? true : false;
            let isMinPositive = Math.sign( min ) >= 0 ? true : false;
            let startPoint = Math.ceil( min / rangeShare );
            let endPoint = Math.ceil( max / rangeShare );

            if( isMaxPositive ){
                endPoint = Math.ceil( max / rangeShare ) * stepSize;
            } else {
                endPoint = Math.floor( max / rangeShare ) * stepSize;
            };

            if( isMinPositive ){
                startPoint = Math.ceil( min / rangeShare ) * stepSize;
            } else {
                startPoint = Math.floor( min / rangeShare ) * stepSize;
            };

            // let loopIndex = (Math.abs( endPoint ) + Math.abs( startPoint )) / ;

            let dataArr = [];
            let whileEndValue = 0;
            let whileIndex = 0;
            while( whileEndValue != endPoint ){
                whileEndValue = startPoint + (stepSize * whileIndex);
                dataArr.push( whileEndValue );
                whileIndex++;
            };

            return dataArr;
        };

        let result = addDataTexts( maxValue, minValue, range, stepSize );

        expect(stepSize).toEqual(10);
        expect(range).toEqual(88);
        expect(result).toEqual([-10, 0, 10, 20, 30, 40, 50, 60, 70, 80]);

    });

    test.skip('calcStepSize 테스트', () => {
        let maxValue = Math.max.apply(null, fullArr);
        let minValue = Math.min.apply(null, fullArr);
        let range = maxValue - minValue
        let stepSize = calcStepSize( range, 10 );

        function addDataTexts( max: number, min: number, range: number, stepSize: number ){
            let rangeShare = Math.ceil( range / stepSize );
            let isMaxPositive = Math.sign( min ) >= 0 ? true : false;
            let isMinPositive = Math.sign( min ) >= 0 ? true : false;
            let startPoint = Math.ceil( min / rangeShare );
            let endPoint = Math.ceil( max / rangeShare );

            if( isMaxPositive ){
                endPoint = Math.ceil( max / rangeShare ) * stepSize;
            } else {
                endPoint = Math.floor( max / rangeShare ) * stepSize;
            };

            if( isMinPositive ){
                startPoint = Math.ceil( min / rangeShare ) * stepSize;
            } else {
                startPoint = Math.floor( min / rangeShare ) * stepSize;
            };

            // let loopIndex = (Math.abs( endPoint ) + Math.abs( startPoint )) / ;

            let dataArr = [];
            let whileEndValue = 0;
            let whileIndex = 0;
            while( whileEndValue != endPoint ){
                whileEndValue = startPoint + (stepSize * whileIndex);
                dataArr.push( whileEndValue );
                whileIndex++;
            };

            return dataArr;
        };

        let result = addDataTexts( maxValue, minValue, range, stepSize );

        expect(stepSize).toEqual(10);
        expect(range).toEqual(88);
        expect(result).toEqual([-10, 0, 10, 20, 30, 40, 50, 60, 70, 80]);

    });

    test('불규칙한 값 테스트',() => {
        let result = calcStepSize(2000, 10);
        let result2 = getDataArr(1000, -1000, 2000, 500);
        console.log(result2);

        // expect(result).toEqual(10);
        expect(result2).toEqual(10);
    })
});


describe('Line chart에서 line 그리기', () => {
    let config: TConfig = {
        type: 'line',
        data: {
            labels: ['1','2','3','4','5','6','7','8'],
            datasets: [
                {
                    label: '1',
                    data: [80, -19, 7, -65, -50, -20, -11],
                    fill: true,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0,
                    lineWidth: 1
                }, 
                {
                    label: '2',
                    data: [4, 61, -87, 10, -79, -40, 40],
                    fill: true,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0,
                    lineWidth: 1
                }
            ]
        },
        options: {
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'text'
                }
            }
        }
    };

    let data = [-1,-2,-3,-4,-5,-6,-7,-8];

    test.skip('curValue가 -5인 경우 대한 height 값 비율 구하기', () => {
        let maxValue: number = 80;
        let minValue: number = -10;
        let curValue: number = -5;
        let range = maxValue - minValue;
        let lineHeight = curValue / range;

        if( Math.sign(minValue) < 0 && Math.sign(lineHeight) >= 0 ){
            lineHeight = lineHeight + Math.abs( minValue / range );
        } else {
            lineHeight = Math.abs( lineHeight );
        };
        
        expect(lineHeight).toEqual(0.05555555555555555);
    });

    test.skip('curValue가 5인 경우 대한 height 값 비율 구하기', () => {
        let maxValue: number = 80;
        let minValue: number = -10;
        let curValue: number = 5;
        let range = maxValue - minValue;
        let lineHeight = curValue / range;

        if( Math.sign(minValue) < 0 && Math.sign(lineHeight) >= 0 ){
            lineHeight = lineHeight + Math.abs( minValue / range );
        };
        
        expect(lineHeight).toEqual(0.16666666666666666);
    });

    test.skip('curValue가 -5인 경우 대한 height 값 구하기', () => {
        let height: number = 300;
        let maxValue: number = 80;
        let minValue: number = -10;
        let curValue: number = -5;
        let range = maxValue - minValue;
        let lineHeightRatio = curValue / range;

        if( Math.sign(minValue) < 0 && Math.sign(lineHeightRatio) >= 0 ){
            lineHeightRatio = lineHeightRatio + Math.abs( minValue / range );
        } else {
            lineHeightRatio = Math.abs( lineHeightRatio );
        };

        let realHeight = height * lineHeightRatio;
        
        expect(realHeight).toEqual(16.666666666666664);
    });

    test.skip('curValue가 5인 경우 대한 height 값 구하기', () => {
        let height: number = 300;
        let maxValue: number = 80;
        let minValue: number = -10;
        let curValue: number = 5;
        let range = maxValue - minValue;
        let lineHeightRatio = curValue / range;

        if( Math.sign(minValue) < 0 && Math.sign(lineHeightRatio) >= 0 ){
            lineHeightRatio = lineHeightRatio + Math.abs( minValue / range );
        };
        
        let realHeight = height * lineHeightRatio;

        expect(realHeight).toEqual(50);
    });
});