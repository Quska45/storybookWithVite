import type { Chart } from "chart.js";
import { OntuneChartColorUtil } from "../OntuneChartUtils";

const getOrCreateLegendList = (chart, id) => {
    const legendContainer = document.getElementById(id);
    let listContainer = legendContainer.querySelector('div');
  
    if (!listContainer) {
      listContainer = document.createElement('div');
      listContainer.style.display = 'flex';
      listContainer.style.flexDirection = 'column';
      listContainer.style.margin = '0';
      listContainer.style.padding = '0';
  
      legendContainer.appendChild(listContainer);
    }
  
    return listContainer;
};

export const htmlLegendPlugin = {
    id: 'htmlLegend',
    afterUpdate( chart: Chart, args, options ){
        const container = getOrCreateLegendList(chart, options.containerID);

        // Remove old legend items
        while (container.firstChild) {
            container.firstChild.remove();
        }

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

            // Text
            const textContainer = document.createElement('p');
            textContainer.style.color = item.fontColor as string;
            textContainer.style.margin = '0';
            textContainer.style.padding = '0';

            const text = document.createTextNode(item.text);
            textContainer.appendChild(text);

            itemDiv.appendChild( checkbox );
            itemDiv.appendChild( colorPicker );
            itemDiv.appendChild(textContainer);
            container.appendChild( itemDiv );
        });
    }
}