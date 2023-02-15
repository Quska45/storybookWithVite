import { render, screen, fireEvent } from '@testing-library/svelte';
import * as PIXI from "pixi.js"
import { Application } from 'pixi.js';
import { PixiLineChart } from '../../src/component/FlowBiteSvelte/TS/FlowBiteSvelteLineChartByPIXI/PixiLineChart/API/PixiLineChart';
// import FlowBiteSvelteLineChartByPixi from './src/component/FlowBiteSvelte/FlowBiteSvelteLineChartByPixi.svelte';

/**
 * Given : 
 * When  : 
 * Then  :  
*/
// test('', () => {

// });

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

describe('PIXI 렌더링 관련 테스트', () => {
    let body: HTMLElement;
    let app: Application;
    let pixiLineChart: PixiLineChart;

    beforeEach(() => {
        body = document.body;
        body.style.width = '500px';
        body.style.height = '300px';
        app = new Application({
            width: 500
            , height: 300
            , resizeTo: body
        });
        pixiLineChart = new PixiLineChart( app );
        
        if( document.body.querySelector( 'canvas' ) ){
            body.removeChild( document.body.querySelector( 'canvas' ) );
        }
    });

    test('PIXI view를 body에 pixi append 시키기', () => {
        body.appendChild( (app.view as HTMLCanvasElement) );

        expect(body.querySelector('canvas')).toBeInTheDocument();
    });

    /**
     * Given : 픽시 엔진을 만든다.
     * When  : body에 append 시킨다.
     * Then  : 엔진에 의해 canvas가 제대로 body에 붙어 있는지 확인 한다.
    */
    test('Pixi engine으로 body에 pixi append 시키기', () => {
        // Given : 픽시 엔진을 만든다. - beforeEach에서 만들었음

        // When  : body에 append 시킨다.
        pixiLineChart.attachBySelector( 'body' );

        // Then  : 엔진에 의해 canvas가 제대로 body에 붙어 있는지 확인 한다.
        expect(body.querySelector('canvas')).toBeInTheDocument();
    });
});
