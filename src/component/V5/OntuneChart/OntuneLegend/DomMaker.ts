import type { Chart, LegendItem } from "chart.js";
import { OntuneChartColorUtil } from "../OntuneChartUtils";

export const DomElementMaker = {
    getItemDiv: () => {
        const itemDiv = document.createElement( 'div' );
        itemDiv.style.width = '100%';
        itemDiv.style.height = '20px';
        itemDiv.style.display = 'flex';
        itemDiv.style.marginBottom = '5px';
        itemDiv.style.alignItems = 'center';
        itemDiv.style.justifyContent = 'space-between';
        // itemDiv.style.position = 'relative';

        return itemDiv;
    },
    getCheckbox: ( chart: Chart, item: LegendItem ) => {
        const checkbox = document.createElement( 'input' );
        checkbox.type = 'checkbox';
        checkbox.checked = chart.isDatasetVisible(item.datasetIndex) ? true : false;
        checkbox.onchange = ( event ) => {
            chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
            chart.update();
        };

        return checkbox;
    },
    getColorPicker: ( chart: Chart, item: LegendItem ) => {
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

        return colorPicker;
    },
    TextContainer: {
        getTextContainer: ( item: LegendItem ) => {
            const textContainer = document.createElement('div');
            textContainer.style.color = item.fontColor as string;
            textContainer.style.margin = '0';
            textContainer.style.padding = '0';
            // textContainer.style.textOverflow = 'ellipsis';
            textContainer.style.width = '50px'
            textContainer.style.whiteSpace = 'nowrap';
            textContainer.style.overflow = 'hidden';
            textContainer.style.cursor = 'pointer';
            textContainer.title = item.text;
            
            return textContainer;
        },
    },
    getItemInnerDiv: () => {
        const itemInnerDiv = document.createElement( 'div' );
        itemInnerDiv.style.display = 'flex';
        itemInnerDiv.style.alignItems = 'center';

        return itemInnerDiv;
    },
    LineWidth: {
        getLineWidthContainer: () => {
            const lineWidthContainer = document.createElement( 'div' );
            lineWidthContainer.style.position = 'absolute';
            lineWidthContainer.style.top = '0';
            lineWidthContainer.style.left = '0';
            lineWidthContainer.style.width = '140px'
            lineWidthContainer.style.height = '30px'
            lineWidthContainer.style.border = '1px solid red';
            lineWidthContainer.style.marginLeft = '50px';
            lineWidthContainer.style.backgroundColor = 'white';
            lineWidthContainer.style.display = 'none';

            const label = DomElementMaker.LineWidth.getLineWidthLabel();
            lineWidthContainer.appendChild( label );
            
            const input = DomElementMaker.LineWidth.getLineWidthInput();
            lineWidthContainer.appendChild( input );

            const button = DomElementMaker.LineWidth.getLineWidthButton();
            lineWidthContainer.appendChild( button );

            return lineWidthContainer;
        },
        getLineWidthLabel: () => {
            const lineWidthLabel = document.createElement( 'label' );
            lineWidthLabel.style.marginRight = '5px';
            lineWidthLabel.innerText = 'width : '
            
            return lineWidthLabel;
        },
        getLineWidthInput: () => {
            const lineWidthInput = document.createElement( 'input' );
            lineWidthInput.style.width = '20px';
            lineWidthInput.style.marginRight = '5px';
            
            return lineWidthInput;
        },
        getLineWidthButton: () => {
            const lineWidthButton = document.createElement( 'button' );
            lineWidthButton.style.width = '50px';
            lineWidthButton.innerText = '적용';

            return lineWidthButton;
        },
    },
};