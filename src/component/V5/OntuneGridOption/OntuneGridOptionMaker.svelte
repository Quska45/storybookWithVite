<script lang="ts" context="module">
    import type {
        Options,
        CellComponent,
        ColumnDefinition,
        EmptyCallback,
        FormatterParams,
    } from 'tabulator-tables';
    import UiColorInput from '../onTuneGrid/components/UiColorInput.svelte';
    import { v4 as uuid } from 'uuid';
    import type { Chart, LegendItem } from 'chart.js';
    import { OntuneChartColorUtil } from '../OntuneChart/OntuneChartUtils';
    import type { OntuneChart } from '../OntuneChart/OntuneChart';
    import type { OntuneGridColorPicker } from './OntuneGridColorPicker';
    import { GridOptionMaker } from './GridOptionMaker'

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
                id: cellData.index
            },
        });

        onRendered(() => {
            app.$destroy();
        });
        return wrapper.innerHTML;
    }

    export let makeColums = ( _ontuneChart: OntuneChart, ontuneGridColorPicker: OntuneGridColorPicker ): ColumnDefinition[] => {
        return [
            {
                title: '',
                formatter: 'rowSelection',
                titleFormatter: 'rowSelection',
                hozAlign: 'center',
                headerHozAlign: 'center',
                headerSort: false,
                width: 60,
                cellClick: function (e: UIEvent, cell: CellComponent) {
                    // console.log('cell.getRow().getIndex()', cell.getRow().getIndex())
                    // console.log('cell.getRow()', cell.getRow())
                    cell.getRow().toggleSelect();
                },
            },
            {
                title: 'Name',
                formatter: renderMyComponent,
                width: 100,
                hozAlign: 'center',
                cellMouseEnter: ( event: UIEvent, cell: CellComponent )=>{
                    const cellIndex = cell.getRow().getIndex();
                    const chart = _ontuneChart.chart;
                    const legendItems = chart.options.plugins.legend.labels.generateLabels( chart );
                    const legendItem = legendItems[ cellIndex ];

                    ontuneGridColorPicker.mouseEnter( chart, legendItem, event, cell );
                },
                cellMouseLeave: ( event: UIEvent, cell: CellComponent ) => {
                    const cellIndex = cell.getRow().getIndex();
                    const chart = _ontuneChart.chart;
                    const legendItems = chart.options.plugins.legend.labels.generateLabels( chart );
                    const legendItem = legendItems[ cellIndex ];

                    ontuneGridColorPicker.mouseLeave( chart, legendItem, event, cell );
                },
                cellClick: function ( e: UIEvent, cell: CellComponent ) {
                    const index = cell.getRow().getIndex()
                    e.target?.addEventListener('input', () => {
                        if (
                            e.target &&
                            (e.target as unknown as { parentNode: HTMLElement }).parentNode
                        ) {
                            const index = cell.getRow().getIndex();
                            const targetEl = e.target as HTMLInputElement & { parentNode: HTMLElement };
                            const parentEl = targetEl.parentNode as HTMLElement;
                            const labelEl = parentEl.querySelector('.color-chip') as HTMLLabelElement;
                            labelEl.style.background = ( e.target as UIEvent['target'] & { value: string } ).value;

                            const itemData = _ontuneChart.chart.data.datasets[ index ];
                            itemData.borderColor = OntuneChartColorUtil.hexToRgb( targetEl.value );
                            _ontuneChart.chart.update();
                        };
                    });
                },

                
            },
            {
                title: 'Value',
                field: 'value',
                width: 100,
            },
        ];
    };

    export const OntuneGridOptionsMaker = {
        getOntuneGridOptionsMaker: function( _ontuneChart: OntuneChart ){
            return new GridOptionMaker( _ontuneChart );
        }
    };
</script>