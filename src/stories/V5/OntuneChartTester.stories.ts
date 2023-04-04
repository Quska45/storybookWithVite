import OntuneChartTester from '../../component/V5/OntuneChartTester.svelte';
import { TestDataMaker } from '../../component/V5/OntuneChart/OntuneChartConst';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes
export default {
  title: 'Example/V5/OntuneChartTester',
  component: OntuneChartTester,
  argTypes: {
  }
};

// More on component templates: https://storybook.js.org/docs/svelte/writing-stories/introduction#using-args
const Template = (args) => ({
  Component: OntuneChartTester,
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
  // componentWidth : 800,
  // componentHeight : 500,
  // chartType : 'line',
  // showLegend : true,
  // legendPosition : 'right',
  // leftYAxesMin : 0,
  // leftYAxesMax : 10000,
  // rightYAxesMin : 0,
  // rightYAxesMax : 100,
  // yAxesPosition : 'left',
  // showLegendValue : true,
  // globalLineWidth : globalLineWidth,
  // showCrossHair : true,
  // useIndicator : true,
  // useAnimation : false,
  // aodMaxTooltipPosition: 'last',
  // showAodMaxTooltip: true,
  // chartCategory: { id: 'CPU', name: 'CPU' },
  // chartCatetories: [ { id: 'CPU', name: 'CPU' }, { id: 'Memory', name: 'Memory' } ],
  // showLevel1Event: true,
  // showLevel2Event: true,
  // showLevel3Event: true,
  // showLevel4Event: true,
  // showLevel5Event: true,
  // level1EventValue: 1000,
  // level2EventValue: 2000,
  // level3EventValue: 3000,
  // level4EventValue: 4000,
  // level5EventValue: 5000,
  // level1EventLineWidth: 2,
  // level2EventLineWidth: 2,
  // level3EventLineWidth: 2,
  // level4EventLineWidth: 2,
  // level5EventLineWidth: 2,
  // level1EventPosition: 'right',
  // level2EventPosition: 'right',
  // level3EventPosition: 'right',
  // level4EventPosition: 'right',
  // level5EventPosition: 'right',
  // lineTension: globalLineTension,
  // showDataValueTooltip: false,
  // yAxesUnit: '%',
  // showYAxesUnit: true,
  // labels : TestDataMaker.getTerm(),
  // datasets : TestDataMaker.getHost( globalLineWidth, globalLineTension )
};