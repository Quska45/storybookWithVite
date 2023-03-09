import FlowBiteSvelteLineChartByOffScreen from '../../component/FlowBiteSvelte/FlowBiteSvelteLineChartByOffScreen.svelte';
import { TCellTHeadDummyData } from '../../component/FlowBiteSvelte/TS/FlowBiteSvelteTable'
import { currentTime } from '../../component/FlowBiteSvelte/TS/FlowBiteSvelteLineChart/data/FlowBiteSvelteLineChartOptions';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes
export default {
  title: 'Example/FlowBiteSvelteLineChartByOffScreen',
  component: FlowBiteSvelteLineChartByOffScreen,
  argTypes: {
    host: {
      control: { type: 'select' },
      options: [10, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
      description: '호스트의 수. 호스트 1개당 차트에서 1개의 라인이 추가됨',
      table: {
        type: { summary: 'number' },
      },
    },
    term: {
      control: { type: 'select' },
      options: [60, 300, 600, 1200, 1800, 2400, 3000, 3600],
      description: '적재하려는 시간데이터(x축의 데이터). 1당 1초를 의미함',
      table: {
        type: { summary: 'number' },
      },
    },
    isStreamStart: {
      control: { type: 'select' },
      options: [true, false],
      description: '1초 단위 데이터 업데이트 실행 여부',
      table: {
        type: { summary: 'boolean' },
      },
    },
    isShowAllData: {
      control: { type: 'select' },
      options: [true, false],
      description: '모든 term에 대한 데이터를 표시 할지에 대한 여부. false면 마지막 10개 term에 대한 데이터만 표시 ',
      table: {
        type: { summary: 'boolean' },
      },
    },
    buttonProps: {
      control: 'object'
    },
    tableHeaders: {
      control: { type: 'object' }
    },
    tabs: {
      control: { type: 'object' }
    },
    tabItemStyleStr: {
      control: { type: 'object' }
    }
  }
};

// More on component templates: https://storybook.js.org/docs/svelte/writing-stories/introduction#using-args
const Template = (args) => ({
  Component: FlowBiteSvelteLineChartByOffScreen,
  props: args,
  on: {
    click: args.onClick,
  },
});

// More on args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Primary = Template.bind({});
Primary.args = {
  host: 10,
  term: 3600,
  isStreamStart: true,
  isShowAllData: false,
  buttonProps: [
    {
      color: 'red',
      size: 'xs',
      width: '',
      height: '',
      styleStr: 'width: 20px; height: 20px; padding: 0px; margin-left: 2px;',
      svgClass: 'w-3',
      svg_d: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z',
      isSelected: false
    },
    {
      color: 'green',
      size: 'xs',
      width: '',
      height: '',
      styleStr: 'width: 20px; height: 20px; padding: 0px; margin-left: 2px;',
      svgClass: 'w-3',
      svg_d: 'M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3',
      isSelected: false
    },
    {
      color: 'green',
      size: 'xs',
      width: '',
      height: '',
      styleStr: 'width: 20px; height: 20px; padding: 0px; margin-left: 2px;',
      svgClass: 'w-3',
      svg_d: 'M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18',
      isSelected: false
    }
  ],
  tableHeaders: TCellTHeadDummyData,
  tabs: [
    {
      isOpen: true,
      title: 'Memory'
    }
  ],
  tabItemStyleStr: 'height: 450px;'
};