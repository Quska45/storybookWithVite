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
        const { lineWidthContainer, lineWidthLabel, lineWidthInput, lineWidthButton } = DomElementMaker.LineWidth.getLineWidthContainer( chart );
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

    // private domElementMaker = {
    //     getItemDiv: () => {
    //         const itemDiv = document.createElement( 'div' );
    //         itemDiv.style.width = '100%';
    //         itemDiv.style.height = '20px';
    //         itemDiv.style.display = 'flex';
    //         itemDiv.style.marginBottom = '5px';
    //         itemDiv.style.alignItems = 'center';
    //         itemDiv.style.justifyContent = 'space-between';
    //         // itemDiv.style.position = 'relative';

    //         return itemDiv;
    //     },
    //     getCheckbox: ( chart: Chart, item: LegendItem ) => {
    //         const checkbox = document.createElement( 'input' );
    //         checkbox.type = 'checkbox';
    //         checkbox.checked = chart.isDatasetVisible(item.datasetIndex) ? true : false;
    //         checkbox.onchange = ( event ) => {
    //             chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
    //             chart.update();
    //         };

    //         return checkbox;
    //     },
    //     getColorPicker: ( chart: Chart, item: LegendItem ) => {
    //         const colorPicker = document.createElement( 'input' );
    //         colorPicker.type = 'color';
    //         colorPicker.style.width = '25px';
    //         colorPicker.style.border = 'none';
    //         colorPicker.style.cursor = 'pointer';
    //         colorPicker.style.backgroundColor = 'transparent';
    //         colorPicker.value = OntuneChartColorUtil.rgbToHex( item.strokeStyle );
    //         colorPicker.addEventListener('input', ( event: Event ) => {
    //             const itemData = chart.data.datasets[item.datasetIndex];
    //             let target = ( event.target as HTMLInputElement );
    //             itemData.borderColor = OntuneChartColorUtil.hexToRgb( target.value );
    //             chart.update();
    //         });

    //         return colorPicker;
    //     },
    //     getTextContainer: ( item: LegendItem ) => {
    //         const textContainer = document.createElement('div');
    //         textContainer.style.color = item.fontColor as string;
    //         textContainer.style.margin = '0';
    //         textContainer.style.padding = '0';
    //         // textContainer.style.textOverflow = 'ellipsis';
    //         textContainer.style.width = '50px'
    //         textContainer.style.whiteSpace = 'nowrap';
    //         textContainer.style.overflow = 'hidden';
    //         textContainer.style.cursor = 'pointer';
    //         textContainer.title = item.text;
    //         this.textContainers.push( textContainer );
            
    //         return textContainer;
    //     },
    //     getItemInnerDiv: () => {
    //         const itemInnerDiv = document.createElement( 'div' );
    //         itemInnerDiv.style.display = 'flex';
    //         itemInnerDiv.style.alignItems = 'center';

    //         return itemInnerDiv;
    //     },
    //     LineWidth: {
    //         getLineWidthContainer: () => {
    //             const lineWidthContainer = document.createElement( 'div' );
    //             lineWidthContainer.style.position = 'absolute';
    //             lineWidthContainer.style.top = '0';
    //             lineWidthContainer.style.left = '0';
    //             lineWidthContainer.style.width = '140px'
    //             lineWidthContainer.style.height = '30px'
    //             lineWidthContainer.style.border = '1px solid red';
    //             lineWidthContainer.style.marginLeft = '50px';
    //             lineWidthContainer.style.backgroundColor = 'white';
    //             lineWidthContainer.style.display = 'none';

    //             const label = this.domElementMaker.LineWidth.getLineWidthLabel();
    //             lineWidthContainer.appendChild( label );
                
    //             const input = this.domElementMaker.LineWidth.getLineWidthInput();
    //             lineWidthContainer.appendChild( input );

    //             const button = this.domElementMaker.LineWidth.getLineWidthButton();
    //             lineWidthContainer.appendChild( button );

    //             return lineWidthContainer;
    //         },
    //         getLineWidthLabel: () => {
    //             const lineWidthLabel = document.createElement( 'label' );
    //             lineWidthLabel.style.marginRight = '5px';
    //             lineWidthLabel.innerText = 'width : '
                
    //             return lineWidthLabel;
    //         },
    //         getLineWidthInput: () => {
    //             const lineWidthInput = document.createElement( 'input' );
    //             lineWidthInput.style.width = '20px';
    //             lineWidthInput.style.marginRight = '5px';
                
    //             return lineWidthInput;
    //         },
    //         getLineWidthButton: () => {
    //             const lineWidthButton = document.createElement( 'button' );
    //             lineWidthButton.style.width = '50px';
    //             lineWidthButton.innerText = '적용';
    
    //             return lineWidthButton;
    //         }
    //     },
        
    // };

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