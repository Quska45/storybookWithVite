import { render, screen, fireEvent } from '@testing-library/svelte';
// import App from '../src/App.svelte';
import LineChart from '../src/stories/LineChart.svelte'
import { Engine } from '../src/stories/CanvasEngine/API/Engine'
import { Vector } from '../src/stories/CanvasEngine/Core/Math/Vector';

describe('LineChart Container load test', ()=>{
    // test("LineChart load test by pure screen object", () => {
    //     render(LineChart);
    //     // const node = screen.queryByText("Hello world!");
    //     // expect(node).not.toBeNull();
    //     // testing library를 사용하기 위해 실제 코드에 role을 추가해야 하는 것은 이상한 것 같다.
    //     let node = screen.getByRole( 'canvasTarget' );
    //     let dom = document.getElementById('canvasTarget');
    //     expect(node).toBeInTheDocument();
    // });
    
    test("LineChart load test by dom", () => {
        let lineChart = render(LineChart);
        let canvasTarget = lineChart.container.querySelector( '#canvasTarget' );
    
        expect(canvasTarget).toBeInTheDocument();
    });
});

describe('canvas load test', () => {
    test("canvas load test by dom", () => {
        let lineChart = render(LineChart);
        let canvas = lineChart.container.querySelector( 'canvas' );
    
        expect(canvas).toBeInTheDocument();
    });

    test('canvas draw test', async () => {
        let lineChart = render(LineChart);
        let engine = new Engine( '#canvasTarget' );

        engine.addLine( 'testLine', new Vector(1,1), new Vector(5,5) );
        engine.run();
    
        // expect(canvas).toBeInTheDocument();
    });
});

