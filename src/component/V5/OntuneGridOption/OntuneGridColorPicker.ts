import type { LegendItem } from "chart.js";
import type { Chart } from "chart.js";
import type {
    CellComponent,
} from 'tabulator-tables';
import { OntuneChartColorUtil } from "../OntuneChart/OntuneChartUtils";

export class OntuneGridColorPicker {
    dom: HTMLElement;
    index: number;
    originalLineWidth: number;

    click( chart: Chart, item: LegendItem, event: UIEvent ){
        const itemData = chart.data.datasets[item.datasetIndex];
        let target = ( event.target as HTMLInputElement );
        itemData.borderColor = OntuneChartColorUtil.hexToRgb( target.value );
        chart.update();
    };

    mouseEnter( chart: Chart, item: LegendItem, event: UIEvent, cell: CellComponent ){
        const dataset = chart.data.datasets;
        const datasetIndex = item.datasetIndex;

        this.index = datasetIndex;
        this.originalLineWidth = dataset[ datasetIndex ].borderWidth as number;

        dataset[ datasetIndex ].borderWidth = (dataset[ datasetIndex ].borderWidth as number) * 2;
        chart.update();
    };

    mouseLeave( chart: Chart, item: LegendItem, event: UIEvent, cell: CellComponent ){
        const dataset = chart.data.datasets;

        dataset[ this.index ].borderWidth = this.originalLineWidth;
        chart.update();
    };
};