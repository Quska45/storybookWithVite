import {
    Chart,
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
    TimeScale,
    LineController,
    Filler
} from "chart.js";
import { MiniMapChart } from "./MiniMapChart/MiniMapChart";

Chart.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
    TimeScale,
    LineController,
    Filler    
);

const minimapChart= new MiniMapChart();

onmessage = function( event: MessageEvent ){
    const { type } = event.data;

    if( !type ){
        console.warn( 'minimap worker는 type 인자가 반드시 필요합니다.' );
        return;
    };

    /** 
     * worker에서 처리해야할 모든 기능에 대한 처리기
     * event.data의 인자로 뭐가 들어올지 알 수 없다는 한계가 있음.
     * 호출되는 기능별로 타입을 전부 만들면 되지만 손이 너무 많이 가서 싫음.
     * 그리고 타입을 만든다고 해서 인자를 강제하거나 확실하게 명시적으로 하는 것도 아님.
     * 구조적인 고민이 더 필요함. 근데 솔직히 이 이상이 안나올 것 같기는 함.
    */
    minimapChart[ type ]( event );

    // config.plugins.push({
    //     id: 'test',
    //     afterRender: ( chart: Chart ) => {
    //         const ctx = chart.ctx;
    //         console.log(ctx);
    //         ctx.beginPath();
    //         ctx.fillStyle = 'rgb(255, 0, 0)'
    //         ctx.fillRect( 10, 10, 100, 100 );
    //         ctx.stroke();
    //         ctx.closePath()
    //     }
    // });
    // minimapChart.chart.update();
};