import type {
    CellComponent,
    Options,
    ColumnDefinition,
    EmptyCallback,
    FormatterParams,
} from 'tabulator-tables';
import { v4 as uuid } from 'uuid';
// import UiColorInput from '../../onTuneGrid/components/UiColorInput.svelte';

export class OntuneGridLegend {
    // makeOptions(){
    //     const createData = () => {
    //         const id = uuid();
    //         return {
    //             id,
    //             name: id,
    //             value: parseInt(String(Math.random() * 100)),
    //             avg: parseInt(String(Math.random() * 100)),
    //             wAvg: parseInt(String(Math.random() * 100)),
    //             max: parseInt(String(Math.random() * 100)),
    //             maxTime: new Date(),
    //         };
    //     };
    //     const createIdList = (length: number) => {
    //         const result = Array(length);
    
    //         for (let i = 0; i < result.length; i++) {
    //             result[i] = createData();
    //         }
    //         return result as ReturnType<typeof createData>[];
    //     };
    
    //     let data = createIdList(100);
    
    //     // const data = { id: 1, name: '', value: 1, avg: 1, wAvg: 1, max: 1, maxTime: new Date() };
    
    //     // let data = [
    //     //     {
    //     //         id: 1,
    //     //         name: 'Oli Bob',
    //     //         progress: 12,
    //     //         gender: 'male',
    //     //         rating: 1,
    //     //         col: 'red',
    //     //         dob: '19/02/1984',
    //     //         car: 1,
    //     //     },
    //     //     {
    //     //         id: 2,
    //     //         name: 'Mary May',
    //     //         progress: 1,
    //     //         gender: 'female',
    //     //         rating: 2,
    //     //         col: 'blue',
    //     //         dob: '14/05/1982',
    //     //         car: true,
    //     //     },
    //     //     {
    //     //         id: 3,
    //     //         name: 'Christine Lobowski',
    //     //         progress: 42,
    //     //         gender: 'female',
    //     //         rating: 0,
    //     //         col: 'green',
    //     //         dob: '22/05/1982',
    //     //         car: 'true',
    //     //     },
    //     //     {
    //     //         id: 4,
    //     //         name: 'Brendon Philips',
    //     //         progress: 100,
    //     //         gender: 'male',
    //     //         rating: 1,
    //     //         col: 'orange',
    //     //         dob: '01/08/1980',
    //     //     },
    //     //     {
    //     //         id: 5,
    //     //         name: 'Margret Marmajuke',
    //     //         progress: 16,
    //     //         gender: 'female',
    //     //         rating: 5,
    //     //         col: 'yellow',
    //     //         dob: '31/01/1999',
    //     //     },
    //     //     {
    //     //         id: 6,
    //     //         name: 'Frank Harbours',
    //     //         progress: 38,
    //     //         gender: 'male',
    //     //         rating: 4,
    //     //         col: 'red',
    //     //         dob: '12/05/1966',
    //     //         car: 1,
    //     //     },
    //     // ];
    //     function renderMyComponent(
    //         cell: CellComponent,
    //         formatterParams: FormatterParams,
    //         onRendered: EmptyCallback,
    //     ) {
    //         const wrapper = document.createElement('div');
    //         const cellData = cell.getData() as { [key: string]: any };
    //         const app = new UiColorInput({
    //             target: wrapper,
    //             props: {
    //                 data: 'button',
    //                 color: cellData.color,
    //                 id: cellData.id,
    //             },
    //         });
    
    //         onRendered(() => {
    //             app.$destroy();
    //         });
    //         return wrapper.innerHTML;
    //     }
    //     let columns: ColumnDefinition[] = [
    //         {
    //             title: '',
    //             formatter: 'rowSelection',
    //             titleFormatter: 'rowSelection',
    //             hozAlign: 'center',
    //             headerHozAlign: 'center',
    //             headerSort: false,
    //             width: 60,
    //             cellClick: function (e: UIEvent, cell: CellComponent) {
    //                 cell.getRow().toggleSelect();
    //             },
    //         },
    //         {
    //             title: '',
    //             formatter: renderMyComponent,
    //             width: 100,
    //             hozAlign: 'center',
    
    //             cellClick: function (e: UIEvent, cell: CellComponent) {
    //                 e.target?.addEventListener('input', () => {
    //                     if (
    //                         e.target &&
    //                         (e.target as unknown as { parentNode: HTMLElement }).parentNode
    //                     ) {
    //                         const targetEl = e.target as HTMLElement & { parentNode: HTMLElement };
    //                         const parentEl = targetEl.parentNode as HTMLElement;
    //                         const labelEl = parentEl.querySelector('.color-chip') as HTMLLabelElement;
    //                         labelEl.style.background = (
    //                             e.target as UIEvent['target'] & { value: string }
    //                         ).value;
    //                     }
    //                 });
    //             },
    //         },
    //         { title: 'Name', field: 'name', width: 150 },
    
    //         {
    //             title: 'Value',
    //             field: 'value',
    //             width: 100,
    //         },
    //         {
    //             title: 'Avg',
    //             field: 'avg',
    //             width: 100,
    //         },
    //         {
    //             title: 'W-avg',
    //             field: 'wAvg',
    //             width: 100,
    //         },
    //         {
    //             title: 'Max Time',
    //             field: 'maxTime',
    //             width: 90,
    //             hozAlign: 'center',
    //             // formatter: 'datetime',
    //             sorter: 'string',
    //             editor: true,
    //         },
    //     ];
    //     type ColumsType = typeof columns;
    //     console.log(columns, data);
    
    //     const options: Options = {
    //         height: 400,
    //         rowHeight: 40,
    //         data: data, //load row data from array
    //         layout: 'fitColumns', //fit columns to width of table
    //         responsiveLayout: 'hide', //hide columns that dont fit on the table
    //         addRowPos: 'top', //when adding a new row, add it to the top of the table
    //         history: true, //allow undo and redo actions on the table
    //         // pagination: 'local', //paginate the data
    //         paginationSize: 7, //allow 7 rows per page of data
    //         paginationCounter: 'rows', //display count of paginated rows in footer
    //         movableColumns: true, //allow column order to be changed
    //         initialSort: [
    //             //set the initial sort order of the data
    //             { column: 'name', dir: 'asc' },
    //         ],
    //         columns,
    //         rowContextMenu: function (e, component) {
    //             var menu = [
    //                 {
    //                     label: 'Visibale Columns',
    //                     action: function (e: MouseEvent, column: ColumsType) {},
    //                 },
    //                 {
    //                     label: 'Column Fiexed',
    //                     action: function (e: MouseEvent, column: ColumsType) {},
    //                 },
    //                 {
    //                     label: 'Filter ',
    //                     action: function (e: MouseEvent, column: ColumsType) {},
    //                 },
    //                 {
    //                     label: 'Save to Image',
    //                     action: function (e: MouseEvent, column: ColumsType) {},
    //                 },
    //                 {
    //                     label: 'Copy to clipboard',
    //                     action: function (e: MouseEvent, column: ColumsType) {},
    //                 },
    //                 {
    //                     label: 'Export to Text',
    //                     menu: [
    //                         {
    //                             label: 'Csv',
    //                             action: function (e: MouseEvent, column: ColumsType) {},
    //                         },
    //                         {
    //                             label: 'Json',
    //                             action: function (e: MouseEvent, column: ColumsType) {},
    //                         },
    //                         {
    //                             label: 'XLSX',
    //                             action: function (e: MouseEvent, column: ColumsType) {},
    //                         },
    //                         {
    //                             label: 'Pptx ',
    //                             action: function (e: MouseEvent, column: ColumsType) {},
    //                         },
    //                         {
    //                             label: 'Doc ',
    //                             action: function (e: MouseEvent, column: ColumsType) {},
    //                         },
    //                         {
    //                             label: 'PDF  ',
    //                             action: function (e: MouseEvent, column: ColumsType) {},
    //                         },
    //                     ],
    //                 },
    //             ];
    //             return menu;
    //         },
    //         rowSelected: function (row) {
    //             // 행이 선택되었을 때 처리할 로직
    //             console.log('Row selected:', row.getData());
    //         },
    //         rowDeselected: function (row) {
    //             // 행 선택이 취소되었을 때 처리할 로직
    //             console.log('Row deselected:', row.getData());
    //         },
    //     };
    // }
};