import type { Chart } from "chart.js";
import { OntuneChartColorUtil } from "../OntuneChartUtils";

const getOrCreateLegendList = (chart, id) => {
    const legendContainer = document.getElementById(id);
    let listContainer = legendContainer.querySelector('ul');
  
    if (!listContainer) {
      listContainer = document.createElement('ul');
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
    afterUpdate( chart, args, options ){
        console.log( 'options', options );
        const ul = getOrCreateLegendList(chart, options.containerID);

        // Remove old legend items
        while (ul.firstChild) {
            ul.firstChild.remove();
        }

        // Reuse the built-in legendItems generator
        const items = chart.options.plugins.legend.labels.generateLabels(chart);

        items.forEach(( item, i ) => {
            const div = document.createElement( 'div' );
            div.style.width = '100%';
            div.style.height = '20px';
            div.style.display = 'flex';
            div.style.marginBottom = '5px';
            i == 0 ? div.style.marginTop = '5px' : null;

            const checkbox = document.createElement( 'input' );
            checkbox.type = 'checkbox';

            const li = document.createElement('div');
            li.style.alignItems = 'center';
            li.style.cursor = 'pointer';
            li.style.display = 'flex';
            li.style.flexDirection = 'row';
            li.style.marginLeft = '10px';

            // Color box
            const boxSpan = document.createElement('div');
            // boxSpan.style.background = item.fillStyle;
            boxSpan.style.background = item.strokeStyle; // 나는 fillStyle을 안쓰고 있음. 나중에 필요해지면 바꾸기
            boxSpan.style.borderColor = item.strokeStyle;
            boxSpan.style.borderWidth = item.lineWidth + 'px';
            boxSpan.style.display = 'inline-block';
            boxSpan.style.width = '20px';
            boxSpan.style.height = '20px';
            boxSpan.style.marginRight = '5px';
            boxSpan.style.marginLeft = '5px';

            // Color picker
            const colorPicker = document.createElement( 'input' );
            colorPicker.type = 'color';
            colorPicker.style.width = '20px';
            colorPicker.value = OntuneChartColorUtil.rgbToHex( item.strokeStyle );
            colorPicker.addEventListener('input', ( event ) => {
                console.log( event.target.value );
                // item.
            });
            // colorPicker.onchange = ( event ) => {
            //     console.log( event.target.value );
            // };

            // Text
            const textContainer = document.createElement('p');
            textContainer.style.color = item.fontColor;
            textContainer.style.margin = '0';
            textContainer.style.padding = '0';
            textContainer.style.textDecoration = item.hidden ? 'line-through' : '';

            const text = document.createTextNode(item.text);
            textContainer.appendChild(text);

            
            textContainer.onclick = () => {
                chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
                chart.update();
            };

            boxSpan.appendChild( colorPicker );
            li.appendChild(textContainer);
            // div.appendChild( checkbox );
            div.appendChild(boxSpan);
            div.appendChild( li );
            ul.appendChild( div );
        });
    }
}