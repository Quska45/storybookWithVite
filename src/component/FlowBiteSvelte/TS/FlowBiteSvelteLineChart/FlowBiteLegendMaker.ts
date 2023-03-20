import type { Chart, LegendItem } from 'chart.js'
import type { TCell } from '../FlowBiteSvelteTable';

export type TTableRowData = {
    isChecked: boolean,
    value: string
}

export const LegendTable = {
    getOrCreateLegendTable( id ){
        let maker = this;
    
        const legendContainer = document.getElementById(id);
        let tableContainer = legendContainer.querySelector('table');
        
        if (!tableContainer) {
            tableContainer = document.createElement('table');
            tableContainer.style.display = 'flex';
            tableContainer.style.flexDirection = 'row';
            tableContainer.style.margin = '0';
            tableContainer.style.padding = '0';
        
            legendContainer.appendChild(tableContainer);
        }
        
        return tableContainer;
    },
    getThead( table: HTMLTableElement ){
        return table.querySelector( 'thead' );
    },
    getTbody( table: HTMLTableElement ){
        return table.querySelector( 'tbody' );
    },
    createTr(){
        const tr = document.createElement( 'tr' );
        return tr;
    },
    createTh( data: TTableRowData ){
        const th = document.createElement( 'th' );
        th.classList.add( 'px-6', 'py-3' );
        th.style.padding = '3px';
        th.innerText = data.value

        if( data.isChecked ){
            let checkbox = LegendCheckBox.createCheckBox( data )
            th.appendChild( checkbox );
        };

        return th;
    },
    /**
     * tr이 있으면 null return, 없으면 tr 생성해서 붙여주고 return
    */
    appendThToThead( thead: HTMLTableSectionElement, data: TCell[] ){
        const theadTr = thead.querySelector( 'tr' );

        if( theadTr.querySelector( 'th' ) ){
            return;
        }

        const theadThs = data.reduce(( acc, cur ) => {
            const th = LegendTable.createTh( cur );
            theadTr.appendChild( th );
            return acc;
        }, []);
        thead.appendChild( theadTr );

        return theadTr;
    },
    appendTrToTbody( tbody: HTMLTableSectionElement, data: TCell[][] ){
        const tbodyTr = document.createElement( 'tr' );

        while (tbody.firstChild) {
            tbody.firstChild.remove();
        }

        let init: HTMLTableRowElement[] = [];
        let tbodyTrs = data.reduce(( trAcc, trCur, trIndex ) => {
            
            const tbodyTr = LegendTable.createTr();
            trCur.reduce(( thAcc, thCur, thIndex ) => {
                const th = LegendTable.createTh( thCur );
                tbodyTr.appendChild( th );
                return thAcc;
            }, []);
            
            tbody.appendChild( tbodyTr );
            trAcc.push( tbodyTr );
            return  trAcc;

        }, init);

        return tbodyTrs;
    }
}

export const LegendCheckBox = {
    createCheckBox( data: TTableRowData ){
        const checkbox = document.createElement( 'input' );
        checkbox.type = 'checkbox';
        checkbox.classList.add(
            'w-4'
            ,'h-4'
            ,'bg-gray-100'
            ,'border-gray-300'
            ,'dark:ring-offset-gray-800'
            ,'focus:ring-2'
            ,'dark:bg-gray-600'
            ,'dark:border-gray-500'
            ,'rounded'
            ,'text-blue-600'
            ,'focus:ring-blue-500'
            ,'dark:focus:ring-blue-600'
        )

        return checkbox;
    },
    toggleLegend( checkbox: HTMLInputElement, chart: Chart, item: LegendItem ){
        checkbox.onclick = () => {
            chart.setDatasetVisibility( item.index, !chart.isDatasetVisible( item.datasetIndex ) );
        }
        // chart.update();
    }
}