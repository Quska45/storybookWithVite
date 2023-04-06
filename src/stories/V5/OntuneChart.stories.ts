import OntuneChart from '../../component/V5/OntuneChart.svelte';
import { TestDataMaker } from '../../component/V5/OntuneChart/OntuneChartConst';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes
export default {
  title: 'Example/V5/OntuneChart',
  component: OntuneChart,
  argTypes: {
    componentWidth: {
      control: { type: 'select' },
      options: [ 800, 1000 ],
      description: '컴포넌트의 전체 width를 지정',
    },
    componentHeight: {
      control: { type: 'select' },
      options: [ 500, 700 ],
      description: '컴포넌트의 전체 height를 지정',
    },
    chartType: {
      control: { type: 'select' },
      options: [ 'line', 'bar' ],
      description: '차트의 타입',
    },
    showLegend: {
      control: { type: 'select' },
      options: [ true, false ],
      description: '레전드 show / hide 여부',
    },
    legendPosition: {
      control: { type: 'select' },
      options: [ 'top', 'right', 'bottom', 'left' ],
      description: '레전드의 컴포넌트 내에서 위치',
    },
    showCanvasLegend: {
      control: { type: 'select' },
      options: [ true, false ],
      description: 'canvas 레전드 show / hide 여부',
    },
    canvasLegendPosition: {
      control: { type: 'select' },
      options: [ 'top', 'right', 'bottom', 'left' ],
      description: 'canvas 레전드의 컴포넌트 내에서 위치',
    },
    leftYAxesMin: {
      control: { type: 'select' },
      options: [ 0, 50, 100 ],
      description: '왼쪽 y 축의 최소 값',
    },
    leftYAxesMax: {
      control: { type: 'select' },
      options: [ 0, 50, 100, 5000, 10000 ],
      description: '왼쪽 y 축의 최대 값',
    },
    rightYAxesMin: {
      control: { type: 'select' },
      options: [ 0, 50, 100 ],
      description: '오른쪽 y 축의 최소 값',
    },
    rightYAxesMax: {
      control: { type: 'select' },
      options: [ 0, 50, 100 ],
      description: '오른쪽 y 축의 최대 값',
    },
    yAxesPosition: {
      control: { type: 'select' },
      options: [ 'left', 'right', 'both' ],
      description: 'y축이 추가되는 위치',
    },
    showLegendValue: {
      control: { type: 'select' },
      options: [ true, false ],
      description: 'legend의 value show / hide 여부',
    },
    globalLineWidth: {
      control: { type: 'select' },
      options: [ 1, 2, 3 ],
      description: '전체 series의 width',
    },
    showCrossHair: {
      control: { type: 'select' },
      options: [ true, false ],
      description: 'crosshair show / hide 여부',
    },
    useIndicator: {
      control: { type: 'select' },
      options: [ true, false ],
      description: '차트 내에서 dbclick 이벤트 발생 시 indicator 생성',
    },
    useAnimation: {
      control: { type: 'select' },
      options: [ true, false ],
      description: '차트 전체 애니메이션 on / off',
    },
    aodMaxTooltipPosition: {
      control: { type: 'select' },
      options: [ 'first', 'middle', 'last' ],
      description: 'Max 값에 대한 tooltip을 어떤 위치에 보여줄지에 대한 값',
    },
    showAodMaxTooltip: {
      control: { type: 'select' },
      options: [ true, false ],
      description: 'Max 값에 대한 tooltip show / hide',
    },
    chartCategory: {
      control: { type: 'object' },
      description: '현재 선택된 차트 카테고리',
    },
    chartCatetories: {
      control: { type: 'object' },
      description: '차트 카테고리 데이터 세트',
    },
    showLevel1Event: {
      control: { type: 'select' },
      options: [ true, false ],
      description: '레벨1 이벤트에 대한 가이드 라인 on / off',
    },
    showLevel2Event: {
      control: { type: 'select' },
      options: [ true, false ],
      description: '레벨2 이벤트에 대한 가이드 라인 on / off',
    },
    showLevel3Event: {
      control: { type: 'select' },
      options: [ true, false ],
      description: '레벨3 이벤트에 대한 가이드 라인 on / off',
    },
    showLevel4Event: {
      control: { type: 'select' },
      options: [ true, false ],
      description: '레벨4 이벤트에 대한 가이드 라인 on / off',
    },
    showLevel5Event: {
      control: { type: 'select' },
      options: [ true, false ],
      description: '레벨5 이벤트에 대한 가이드 라인 on / off',
    },
    level1EventValue: {
      control: { type: 'select' },
      options: [ 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000 ],
      description: '레벨1 이벤트에 대한 value',
    },
    level2EventValue: {
      control: { type: 'select' },
      options: [ 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000 ],
      description: '레벨2 이벤트에 대한 value',
    },
    level3EventValue: {
      control: { type: 'select' },
      options: [ 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000 ],
      description: '레벨3 이벤트에 대한 value',
    },
    level4EventValue: {
      control: { type: 'select' },
      options: [ 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000 ],
      description: '레벨4 이벤트에 대한 value',
    },
    level5EventValue: {
      control: { type: 'select' },
      options: [ 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000 ],
      description: '레벨5 이벤트에 대한 value',
    },
    level1EventLineWidth: {
      control: { type: 'select' },
      options: [ 1, 2, 3, 4 ],
      description: '레벨1 이벤트에 대한 lineWidth',
    },
    level2EventLineWidth: {
      control: { type: 'select' },
      options: [ 1, 2, 3, 4 ],
      description: '레벨2 이벤트에 대한 lineWidth',
    },
    level3EventLineWidth: {
      control: { type: 'select' },
      options: [ 1, 2, 3, 4 ],
      description: '레벨3 이벤트에 대한 lineWidth',
    },
    level4EventLineWidth: {
      control: { type: 'select' },
      options: [ 1, 2, 3, 4 ],
      description: '레벨4 이벤트에 대한 lineWidth',
    },
    level5EventLineWidth: {
      control: { type: 'select' },
      options: [ 1, 2, 3, 4 ],
      description: '레벨5 이벤트에 대한 lineWidth',
    },
    level1EventPosition: {
      control: { type: 'select' },
      options: [ 'left', 'right' ],
      description: '레벨1 이벤트의 position',
    },
    level2EventPosition: {
      control: { type: 'select' },
      options: [ 'left', 'right' ],
      description: '레벨2 이벤트의 position',
    },
    level3EventPosition: {
      control: { type: 'select' },
      options: [ 'left', 'right' ],
      description: '레벨3 이벤트의 position',
    },
    level4EventPosition: {
      control: { type: 'select' },
      options: [ 'left', 'right' ],
      description: '레벨4 이벤트의 position',
    },
    level5EventPosition: {
      control: { type: 'select' },
      options: [ 'left', 'right' ],
      description: '레벨5 이벤트의 position',
    },
    lineTension: {
      control: { type: 'select' },
      options: [ 0, 0.1, 0.2, 0.3, 0.5, 1 ],
      description: '전체 series의 tension 값',
    },
    showDataValueTooltip: {
      control: { type: 'select' },
      options: [ true, false ],
      description: '모든 꼭지점에 대해 데이터 표시 show / hide',
    },
    yAxesUnit: {
      control: { type: 'select' },
      options: [ '%', 'kg', 'm' ],
      description: 'y axes 값의 단위',
    },
    showYAxesUnit: {
      control: { type: 'select' },
      options: [ true, false ],
      description: 'y axes 값의 단위 show / hide',
    },
    labels: {
      control: { type: 'object' },
      description: 'x축 데이터',
    },
    datasets: {
      control: { type: 'object' },
      description: 'series 데이터',
    }
  }
};

// More on component templates: https://storybook.js.org/docs/svelte/writing-stories/introduction#using-args
const Template = (args) => ({
  Component: OntuneChart,
  props: args,
  on: {
    click: args.onClick,
  },
});

// More on args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Primary = Template.bind({});
const globalLineWidth = 1;
const globalLineTension = 0;
Primary.args = {
  componentWidth : 800,
  componentHeight : 500,
  chartType : 'line',
  showLegend : true,
  legendPosition : 'right',
  showCanvasLegend : false,
  canvasLegendPosition : 'right',
  leftYAxesMin : 0,
  leftYAxesMax : 10000,
  rightYAxesMin : 0,
  rightYAxesMax : 100,
  yAxesPosition : 'left',
  showLegendValue : true,
  globalLineWidth : globalLineWidth,
  showCrossHair : true,
  useIndicator : true,
  useAnimation : false,
  aodMaxTooltipPosition: 'last',
  showAodMaxTooltip: true,
  chartCategory: { id: 'CPU', name: 'CPU' },
  chartCatetories: [ { id: 'CPU', name: 'CPU' }, { id: 'Memory', name: 'Memory' } ],
  showLevel1Event: true,
  showLevel2Event: true,
  showLevel3Event: true,
  showLevel4Event: true,
  showLevel5Event: true,
  level1EventValue: 1000,
  level2EventValue: 2000,
  level3EventValue: 3000,
  level4EventValue: 4000,
  level5EventValue: 5000,
  level1EventLineWidth: 2,
  level2EventLineWidth: 2,
  level3EventLineWidth: 2,
  level4EventLineWidth: 2,
  level5EventLineWidth: 2,
  level1EventPosition: 'right',
  level2EventPosition: 'right',
  level3EventPosition: 'right',
  level4EventPosition: 'right',
  level5EventPosition: 'right',
  lineTension: globalLineTension,
  showDataValueTooltip: false,
  yAxesUnit: '%',
  showYAxesUnit: true,
  labels : TestDataMaker.getTerm(),
  datasets : TestDataMaker.getHost( globalLineWidth, globalLineTension )
};