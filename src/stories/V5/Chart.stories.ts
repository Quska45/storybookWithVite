import OntuneChart from '../../component/V5/OntuneChart.svelte';
import { TestDataMaker } from '../../component/V5/OntuneChart/OntuneChartConst';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes
export default {
  title: 'Example/V5/Chart',
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
    leftYAxesMin: {
      control: { type: 'select' },
      options: [ 0, 50, 100 ],
      description: '왼쪽 y 축의 최소 값',
    },
    leftYAxesMax: {
      control: { type: 'select' },
      options: [ 0, 50, 100 ],
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
      description: '차트 내에서 click 이벤트 발생 시 indicator 생성',
    },
    useAnimation: {
      control: { type: 'select' },
      options: [ true, false ],
      description: '차트 전체 애니메이션 on / off',
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
Primary.args = {
  componentWidth : 800,
  componentHeight : 500,
  chartType : 'line',
  showLegend : true,
  legendPosition : 'right',
  leftYAxesMin : 0,
  leftYAxesMax : 100,
  rightYAxesMin : 0,
  rightYAxesMax : 100,
  yAxesPosition : 'left',
  showLegendValue : true,
  globalLineWidth : globalLineWidth,
  showCrossHair : true,
  useIndicator : true,
  useAnimation : false,
  labels : TestDataMaker.getTerm(),
  datasets : TestDataMaker.getHost( globalLineWidth )
};