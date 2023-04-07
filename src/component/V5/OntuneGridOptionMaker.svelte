<script lang="ts" context="module">
    import type {
        Options,
        CellComponent,
        ColumnDefinition,
        EmptyCallback,
        FormatterParams,
    } from 'tabulator-tables';
    import UiColorInput from './onTuneGrid/components/UiColorInput.svelte';
    import { v4 as uuid } from 'uuid';
    import type { Chart, LegendItem } from 'chart.js';
    import { OntuneChartColorUtil } from './OntuneChart/OntuneChartUtils';
    import type { OntuneChart } from './OntuneChart/OntuneChart';

    let ontuneChart: OntuneChart;

    function renderMyComponent(
        cell: CellComponent,
        formatterParams: FormatterParams,
        onRendered: EmptyCallback,
    ) {
        const wrapper = document.createElement('div');
        const cellData = cell.getData() as { [key: string]: any };
        const app = new UiColorInput({
            target: wrapper,
            props: {
                data: cellData.name,
                color: cellData.color,
                id: cellData.id,
            },
        });

        onRendered(() => {
            app.$destroy();
        });
        return wrapper.innerHTML;
    }

    let columns: ColumnDefinition[] = [
        {
            title: '',
            formatter: 'rowSelection',
            titleFormatter: 'rowSelection',
            hozAlign: 'center',
            headerHozAlign: 'center',
            headerSort: false,
            width: 60,
            cellClick: function (e: UIEvent, cell: CellComponent) {
                cell.getRow().toggleSelect();
            },
        },
        {
            title: 'Name',
            formatter: renderMyComponent,
            width: 100,
            hozAlign: 'center',
            cellMouseOver: ( e: UIEvent, cell: CellComponent )=>{
                console.log('mouseover');
            },
            cellMouseLeave: ( e: UIEvent, cell: CellComponent ) => {
                console.log('mouseleave');
            },
            cellClick: function ( e: UIEvent, cell: CellComponent ) {
                console.log(cell.getData());
                e.target?.addEventListener('input', () => {
                    if (
                        e.target &&
                        (e.target as unknown as { parentNode: HTMLElement }).parentNode
                    ) {
                        const targetEl = e.target as HTMLElement & { parentNode: HTMLElement };
                        const parentEl = targetEl.parentNode as HTMLElement;
                        const labelEl = parentEl.querySelector('.color-chip') as HTMLLabelElement;
                        labelEl.style.background = (
                            e.target as UIEvent['target'] & { value: string }
                        ).value;

                        // const itemData = ontuneChart.chart.data.datasets[  ]
                    }
                });
            },

            
        },
        {
            title: 'Value',
            field: 'value',
            width: 100,
        },

    ];
    type ColumsType = typeof columns;

    export let setOntuneChart = ( _ontuneChart: OntuneChart ) => {
        ontuneChart = _ontuneChart;
    };

    export let getOntuneGridData = ( legendItems: LegendItem[], chart: Chart ) => {
        const ontuneGridData = legendItems.reduce(( acc, cur ) => {
            const itemData = chart.data.datasets[cur.datasetIndex].data;
            const color = OntuneChartColorUtil.rgbToHex( cur.strokeStyle );
            const name = cur.text;
            const value = itemData[itemData.length-1].toString()
            acc.push({ color, name, value });

            return acc;
        }, []);

        return ontuneGridData;
    };

    export let getOntuneGridOptions = ( gridData, height ) => {
        return {
            height: height,
            rowHeight: 40,
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
            columns,
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
    };
</script>