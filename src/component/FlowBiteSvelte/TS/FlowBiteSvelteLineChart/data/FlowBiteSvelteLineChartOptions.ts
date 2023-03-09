import moment from 'moment'
import { LegendTable, LegendCheckBox } from '../FlowBiteLegendMaker'
import { Chart,type ChartOptions, type CoreChartOptions, type ElementChartOptions, type ExtendedPlugin, type Plugin, type PluginChartOptions, type plugins } from 'chart.js';
import { TCellTHeadDummyData, TCellTBodyDummyData } from '../../FlowBiteSvelteTable'
import type { ChartProps } from 'svelte-chartjs/Chart.svelte';

export function randomColorFactor() {
  return Math.floor(Math.random() * 255);
}

export function currentTime(){
  const TIME_ZONE = 3240 * 10000;
  const d = new Date();
  
  const date = new Date(+d + TIME_ZONE).toISOString().split('T')[0];
  const time = d.toTimeString().split(' ')[0];
  return date + ' ' + time;
}

export function currentTimeBeforSecond(sec){
  const TIME_ZONE = 3240 * 10000;
  const d = new Date();
  const _d = d.setSeconds( d.getSeconds() - sec );

  const date = new Date(+d + TIME_ZONE).toISOString().split('T')[0];
  const time = d.toTimeString().split(' ')[0];
  return date + ' ' + time;
}


export const data = {
  labels: [
  ],
  datasets: [
    // {
    //   label: 'pc1',
    //   fill: true,
    //   borderColor: `rgb(${randomColorFactor()}, ${randomColorFactor()}, ${randomColorFactor()})`,
    //   data: [1,2,3,4,5,6,7,8,9,10]
    // }
  ],
};
  
export const dataUtil = {
  makeDataset(){
    let dataset = {
      label: 'pc' + data.datasets.length,
      fill: true,
      borderColor: `rgb(${randomColorFactor()}, ${randomColorFactor()}, ${randomColorFactor()})`,
      data: [1,2,3,4,5,6,7,8,9,10]
    }
    
    return dataset;
  },
  addDataSet( datasets ){
    datasets.push( dataUtil.makeDataset() )
    return datasets;
  },
  addDummyLabel(label){
    label.push(
        currentTimeBeforSecond(1000)
      , currentTimeBeforSecond(900)
      , currentTimeBeforSecond(800)
      , currentTimeBeforSecond(700)
      , currentTimeBeforSecond(600)
      , currentTimeBeforSecond(500)
      , currentTimeBeforSecond(400)
      , currentTimeBeforSecond(300)
      , currentTimeBeforSecond(200)
      , currentTimeBeforSecond(100)
    )
    return label;
  }
}

export let htmlLegendPlugin = {
  id: 'htmlLegend',
  afterUpdate( chart: Chart, args, options ){
    const table = LegendTable.getOrCreateLegendTable( options.containerID );
    const thead = LegendTable.getThead( table );
    const tbody = LegendTable.getTbody( table );


    const theadTr = LegendTable.appendThToThead( thead, TCellTHeadDummyData );
    const tbodyTrs = LegendTable.appendTrToTbody( tbody, TCellTBodyDummyData );

    // Reuse the built-in legendItems generator
    const items = chart.options.plugins.legend.labels.generateLabels(chart);

    items.reduce(( acc, cur, i ) => {
      let checkbox = tbodyTrs[ i ].querySelector( 'input' );
      checkbox.onclick = () => {
        LegendCheckBox.toggleLegend( checkbox, chart, cur );
      };
      return acc;
    }, [])

    items.forEach(item => {
      // const th = 
      return;
      const li = document.createElement('li');
      li.style.alignItems = 'center';
      li.style.cursor = 'pointer';
      li.style.display = 'flex';
      li.style.flexDirection = 'row';
      li.style.marginLeft = '10px';

      li.onclick = () => {
        const {type} = chart.config;
        if (type === 'pie' || type === 'doughnut') {
          // Pie and doughnut charts only have a single dataset and visibility is per item
          chart.toggleDataVisibility(item.index);
        } else {
          chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
        }
        chart.update();
      };

      // Color box
      const boxSpan = document.createElement('span');
      boxSpan.style.background = item.fillStyle;
      boxSpan.style.borderColor = item.strokeStyle;
      boxSpan.style.borderWidth = item.lineWidth + 'px';
      boxSpan.style.display = 'inline-block';
      boxSpan.style.height = '20px';
      boxSpan.style.marginRight = '10px';
      boxSpan.style.width = '20px';

      // Text
      const textContainer = document.createElement('p');
      textContainer.style.color = item.fontColor;
      textContainer.style.margin = '0';
      textContainer.style.padding = '0';
      textContainer.style.textDecoration = item.hidden ? 'line-through' : '';

      const text = document.createTextNode(item.text);
      textContainer.appendChild(text);

      li.appendChild(boxSpan);
      li.appendChild(textContainer);
      table.appendChild(li);
    });
  }
}

export let zoomOption = {
  zoom: {
    mode: "xy",
    drag: {
      enabled: false,
      borderColor: 'rgb(54, 162, 235)',
      borderWidth: 1,
      backgroundColor: 'rgba(54, 162, 235, 0.3)'
    },
    pinch: {
      enable: true
    }
  },
  pan: {
    enabled: true,
    mode: 'xy',
    modifierKey: 'ctrl',
    speed: 10,
    threshold: 10,
    rangeMin: {
      y: 100
    }
  }
}
  
export let options: ChartOptions = {
  // responsive: true,
  // maintainAspectRatio: false,
  animation:{
    onComplete: function() {
      // console.log('Line Chart Rendered Completely!');
    },
    duration: 0
  },
  scales: {
    x:{
      position: 'bottom',
      type: 'time',
      // min: new Date().valueOf(),
      ticks: {
        // maxTicksLimit: 10,
        // autoSkip: true,
        // stepSize: 10,
        // autoSkipPadding: 50,
        // maxRotation: 0
      },
      // time: {
      //   displayFormats: {
      //     hour: 'HH:mm',
      //     minute: 'HH:mm',
      //     second: 'HH:mm:ss'
      //   }
      // }
    },
    y: {
        beginAtZero: true,
        max: 100
    }
  },
  plugins: {
    zoom: zoomOption,
    htmlLegend:{
      containerID: 'legend-container'
    },
    legend: {
      display: false
    }
  }
}