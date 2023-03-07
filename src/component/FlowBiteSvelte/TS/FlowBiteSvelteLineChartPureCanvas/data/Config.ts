import { ChartVector2 } from "./ChartVector2";

export type OntuneChartConfig = {
    type: 'line',
    selector: string,
    data: Object,
    margin: ChartVector2,
    options: Object
};

export const DUMMY_DATA = {
    labels: [
    ],
    datasets: [
        {
            label: 'Dataset 1',
            data: [],
            borderColor: '#FF0000'
        }
    ]
};

export const CONFIG: OntuneChartConfig = {
    type: 'line',
    selector: '#canvasContainer',
    data: DUMMY_DATA,
    margin: new ChartVector2( 20, 20 ),
    options: {

    }
};
