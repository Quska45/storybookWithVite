import type { OntuneChart } from "../OntuneChart/OntuneChart";
import { OntuneGridColorPicker } from "./OntuneGridColorPicker";
import type {
    Options,
    CellComponent,
    ColumnDefinition,
    EmptyCallback,
    FormatterParams,
} from 'tabulator-tables';
import type { Chart, LegendItem } from "chart.js";
import { OntuneChartColorUtil } from "../OntuneChart/OntuneChartUtils";

type ColumsType = typeof ColumnDefinition[];

export class GridOptionMaker {
    ontuneGridColorPicker: OntuneGridColorPicker;
    ontuneChart: OntuneChart;

    constructor( ontuneChart: OntuneChart ){
        this.ontuneChart = ontuneChart;
        this.ontuneGridColorPicker = new OntuneGridColorPicker();
    };

    getOntuneGridData ( legendItems: LegendItem[], chart: Chart ){
        const ontuneGridData = legendItems.reduce(( acc, cur, i ) => {
            const itemData = chart.data.datasets[cur.datasetIndex].data;
            const color = OntuneChartColorUtil.rgbToHex( cur.strokeStyle );
            const name = cur.text;
            const value = itemData[itemData.length-1].toString()
            const index = i

            acc.push({ color, name, value, index });
            return acc;
        }, []);
        return ontuneGridData;
    };

    getOntuneGridOptions( gridData, height, _columns ){
        return {
            height: height,
            rowHeight: 40,
            index:'index',
            data: gridData, //load row data from array
            layout: 'fitColumns', //fit columns to width of table
            // responsiveLayout: 'hide', //hide columns that dont fit on the table
            addRowPos: 'top', //when adding a new row, add it to the top of the table
            history: true, //allow undo and redo actions on the table
            // pagination: 'local', //paginate the data
            paginationSize: 7, //allow 7 rows per page of data
            paginationCounter: 'rows', //display count of paginated rows in footer
            movableColumns: true, //allow column order to be changed
            initialSort: [
                //set the initial sort order of the data
                { column: 'name', dir: 'asc' },
            ],
            columns: _columns,
            rowContextMenu: function (e, component) {
                var menu = [
                    {
                        label: 'Visibale Columns',
                        action: function (e: MouseEvent, column: ColumsType) {},
                    },
                    {
                        label: 'Column Fiexed',
                        action: function (e: MouseEvent, column: ColumsType) {},
                    },
                    {
                        label: 'Filter ',
                        action: function (e: MouseEvent, column: ColumsType) {},
                    },
                    {
                        label: 'Save to Image',
                        action: function (e: MouseEvent, column: ColumsType) {},
                    },
                    {
                        label: 'Copy to clipboard',
                        action: function (e: MouseEvent, column: ColumsType) {},
                    },
                    {
                        label: 'Export to Text',
                        menu: [
                            {
                                label: 'Csv',
                                action: function (e: MouseEvent, column: ColumsType) {},
                            },
                            {
                                label: 'Json',
                                action: function (e: MouseEvent, column: ColumsType) {},
                            },
                            {
                                label: 'XLSX',
                                action: function (e: MouseEvent, column: ColumsType) {},
                            },
                            {
                                label: 'Pptx ',
                                action: function (e: MouseEvent, column: ColumsType) {},
                            },
                            {
                                label: 'Doc ',
                                action: function (e: MouseEvent, column: ColumsType) {},
                            },
                            {
                                label: 'PDF  ',
                                action: function (e: MouseEvent, column: ColumsType) {},
                            },
                        ],
                    },
                ];
                return menu;
            },
            rowSelected: function (row) {
                // 행이 선택되었을 때 처리할 로직
                console.log('Row selected:', row.getData());
            },
            rowDeselected: function (row) {
                // 행 선택이 취소되었을 때 처리할 로직
                console.log('Row deselected:', row.getData());
            },
        }
    }
};