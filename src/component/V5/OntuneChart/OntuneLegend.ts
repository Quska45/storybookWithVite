import type { Chart, LayoutPosition, LegendElement } from "chart.js";
import type { TLengendOptions } from "./OntuneChartType";
import { OntuneChartColorUtil } from "./OntuneChartUtils";

export class OntuneLegend {
    containerId: string;
    legend: LegendElement;
    textContainers: HTMLElement[] = [];

    constructor( legend: LegendElement ){
        this.legend = legend;
    };

    makeLegend( chart: Chart, containerId: string, legendOptions: TLengendOptions ){
        if( !legendOptions.showLegend ){
            return;
        };

        const container = this.getOrCreateLegendContainer( chart, containerId );

        // Remove old legend items
        while ( container.firstChild ) {
            container.firstChild.remove();
        };

        // Reuse the built-in legendItems generator
        const items = chart.options.plugins.legend.labels.generateLabels(chart);

        items.forEach(( item, i ) => {
            // item
            const itemDiv = document.createElement( 'div' );
            itemDiv.style.width = '100%';
            itemDiv.style.height = '20px';
            itemDiv.style.display = 'flex';
            itemDiv.style.marginBottom = '5px';
            itemDiv.style.alignItems = 'center';
            itemDiv.style.justifyContent = 'space-between';
            i == 0 ? itemDiv.style.marginTop = '5px' : null;

            const checkbox = document.createElement( 'input' );
            checkbox.type = 'checkbox';
            checkbox.checked = chart.isDatasetVisible(item.datasetIndex) ? false : true;
            checkbox.onchange = ( event ) => {
                chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
                chart.update();
            };

            // Color picker
            const colorPicker = document.createElement( 'input' );
            colorPicker.type = 'color';
            colorPicker.style.width = '25px';
            colorPicker.style.border = 'none';
            colorPicker.style.cursor = 'pointer';
            colorPicker.style.backgroundColor = 'transparent';
            colorPicker.value = OntuneChartColorUtil.rgbToHex( item.strokeStyle );
            colorPicker.addEventListener('input', ( event: Event ) => {
                const itemData = chart.data.datasets[item.datasetIndex];
                let target = ( event.target as HTMLInputElement );
                itemData.borderColor = OntuneChartColorUtil.hexToRgb( target.value );
                chart.update();
            });

            // Text
            const textContainer = document.createElement('div');
            textContainer.style.color = item.fontColor as string;
            textContainer.style.margin = '0';
            textContainer.style.padding = '0';
            textContainer.style.textOverflow = 'ellipsis';
            textContainer.style.width = '50px'
            textContainer.style.whiteSpace = 'nowrap';
            textContainer.style.overflow = 'hidden';
            this.textContainers.push( textContainer );
            
            const seriesName = document.createTextNode(item.text);
            textContainer.appendChild(seriesName);

            const itemInnerDiv = document.createElement( 'div' );
            itemInnerDiv.style.display = 'flex';
            itemInnerDiv.style.alignItems = 'center';
            itemInnerDiv.appendChild( checkbox );
            itemInnerDiv.appendChild( colorPicker );
            itemInnerDiv.appendChild(textContainer);
            itemDiv.appendChild( itemInnerDiv );
            
            if( legendOptions.showLegendValue ){
                const itemData = chart.data.datasets[item.datasetIndex].data;
                const lastValueDiv = document.createElement( 'div' );
                lastValueDiv.textContent = itemData[itemData.length-1].toString();
                itemDiv.appendChild(lastValueDiv);
            };
            container.appendChild( itemDiv );
        });
        
        let _this = this;
        function outputsize( entry: ResizeObserverEntry[] ) {
            let legendContainer = entry[0].target as HTMLElement;
            let width = legendContainer.clientWidth;
            if( width > 130 ){
                _this.textContainers.forEach(( cur ) => {
                    cur.style.width = `${(width - 100)}px`;
                })
            } else {
                _this.textContainers.forEach(( cur ) => {
                    cur.style.width = '50px';
                })
            };
        };
        new ResizeObserver( outputsize ).observe( container.parentElement );
    };

    private domElementMaker = {
        itemDiv: () => {

        },
        checkbox: () => {

        },
        colorPicker: () => {

        },
        textContainer: () => {

        },
        
    };

    private getOrCreateLegendContainer = (chart: Chart, id: string) => {
        this.containerId = id;

        const legendContainer = document.getElementById(id);
        let listContainer = legendContainer.querySelector('div') as HTMLElement;
      
        if (!listContainer) {
          listContainer = document.createElement('div');
          
          legendContainer.appendChild(listContainer);
        };

        listContainer.style.display = 'flex';
        listContainer.style.flexDirection = 'column';
        listContainer.style.margin = '0';
        listContainer.style.padding = '0';
        listContainer.style.height = '100%';
        listContainer.style.overflowY = 'auto';
      
        return listContainer;
    };
};