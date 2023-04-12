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

const chart = null;

onmessage = function( event ){
    const { offScreenCanvas, config } = event.data;
    chart = new Chart( offScreenCanvas, config );
    chart.resize();
};