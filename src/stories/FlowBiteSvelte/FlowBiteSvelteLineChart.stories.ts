import FlowBiteSvelteLineChart from '../../component/FlowBiteSvelte/FlowBiteSvelteLineChart.svelte';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes
export default {
  title: 'Example/FlowBiteSvelteLineChart',
  component: FlowBiteSvelteLineChart,
  argTypes: {
    buttonProps: {
      control: 'object'
    },
    tableHeaders: {
      control: { type: 'object' }
    },
    tableBodys: {
      control: { type: 'object' }
    },
    tabs: {
      control: { type: 'object' }
    }
  }
};

// More on component templates: https://storybook.js.org/docs/svelte/writing-stories/introduction#using-args
const Template = (args) => ({
  Component: FlowBiteSvelteLineChart,
  props: args,
  on: {
    click: args.onClick,
  },
});

// More on args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Primary = Template.bind({});
Primary.args = {
  buttonProps: [
    {
      color: 'red',
      size: 'xs',
      width: '',
      height: '',
      styleStr: 'width: 20px; height: 20px; padding: 0px; margin-left: 2px;',
      svgClass: 'w-3',
      svg_d: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
    },
    {
      color: 'green',
      size: 'xs',
      width: '',
      height: '',
      styleStr: 'width: 20px; height: 20px; padding: 0px; margin-left: 2px;',
      svgClass: 'w-3',
      svg_d: 'M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
    },
    {
      color: 'green',
      size: 'xs',
      width: '',
      height: '',
      styleStr: 'width: 20px; height: 20px; padding: 0px; margin-left: 2px;',
      svgClass: 'w-3',
      svg_d: 'M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18'
    }
  ],
  headers: [
    {
      isChecked: true,
      value: ''
    },
    {
      isChecked: false,
      value: 'name',
    },
    {
      isChecked: false,
      value: 'value',
    },
    {
      isChecked: false,
      value: 'max',
    }
  ],
  bodys: [
    [
      {
        isChecked: true,
        value: ''
      },
      {
        isChecked: false,
        value: 'mac1',
      },
      {
        isChecked: false,
        value: '50',
      },
      {
        isChecked: false,
        value: '70',
      } 
    ],
    [
      {
        isChecked: true,
        value: ''
      },
      {
        isChecked: false,
        value: 'mac2',
      },
      {
        isChecked: false,
        value: '50',
      },
      {
        isChecked: false,
        value: '70',
      } 
    ],
    [
      {
        isChecked: true,
        value: ''
      },
      {
        isChecked: false,
        value: 'window1',
      },
      {
        isChecked: false,
        value: '50',
      },
      {
        isChecked: false,
        value: '70',
      } 
    ],
    [
      {
        isChecked: true,
        value: ''
      },
      {
        isChecked: false,
        value: 'window2',
      },
      {
        isChecked: false,
        value: '50',
      },
      {
        isChecked: false,
        value: '70',
      } 
    ]
  ],
  tabs: [
    {
      isOpen: true,
      title: 'Memory'
    }
  ]
};