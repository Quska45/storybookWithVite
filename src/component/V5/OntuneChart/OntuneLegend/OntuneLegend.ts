import type { Chart, LayoutPosition, LegendElement, LegendItem } from "chart.js";
import type { TLengendOptions } from "../OntuneChartType";
import { OntuneChartColorUtil } from "../OntuneChartUtils";
import { DomElementMaker } from "./DomMaker";

export class OntuneLegend {
    containerId: string;
    legend: LegendElement;
    textContainers: HTMLElement[] = [];

    constructor( legend: LegendElement ){
        this.legend = legend;
    };

    make( chart: Chart, containerId: string, legendOptions: TLengendOptions ){
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
        const { lineWidthContainer, lineWidthInput } = DomElementMaker.LineWidth.getLineWidthContainer( chart );
        container.appendChild( lineWidthContainer );

        items.forEach(( item, i ) => {
            // item
            const itemDiv = DomElementMaker.getItemDiv();
            
            i == 0 ? itemDiv.style.marginTop = '5px' : null;

            // series show/hide checkbox
            const checkbox = DomElementMaker.getCheckbox( chart, item );

            // Color picker
            const colorPicker = DomElementMaker.getColorPicker( chart, item );

            // Text
            const textContainer = DomElementMaker.TextContainer.getTextContainer( item );
            this.textContainers.push( textContainer );
            textContainer.addEventListener('click', ( event: MouseEvent ) => {
                let containerBBox = container.getBoundingClientRect();

                lineWidthContainer.style.display = 'flex';
                lineWidthContainer.style.top = `${event.clientY - containerBBox.y}px`;

                lineWidthInput.value = chart.data.datasets[item.datasetIndex].borderWidth.toString();
                lineWidthInput.dataset.legendItemIndex = item.datasetIndex.toFixed();
            });
            
            const seriesName = document.createTextNode(item.text);
            textContainer.appendChild(seriesName);

            const itemInnerDiv = DomElementMaker.getItemInnerDiv();
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
            if( width > 140 ){
                _this.textContainers.forEach(( cur ) => {
                    cur.innerText = cur.title;
                    cur.style.width = `${(width - 100)}px`;
                })
            } else {
                _this.textContainers.forEach(( cur ) => {
                    let seriesNameText = cur.innerText;
                    if( seriesNameText.indexOf( '...' ) >= 0 ){
                        return;
                    };
                    const textLength = seriesNameText.length;
                    seriesNameText = `...${seriesNameText[textLength-3]}${seriesNameText[textLength-2]}${seriesNameText[textLength-1]}`
                    cur.innerText = seriesNameText;
                    cur.style.width = '50px';
                })
            };
        };
        new ResizeObserver( outputsize ).observe( container.parentElement );
    };

    destroy( containerId: string ){
        let container = document.getElementById( containerId );
        while ( container.firstChild ) {
            container.firstChild.remove();
        };
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