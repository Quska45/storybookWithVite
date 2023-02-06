import FlowBiteSvelteTable from '../../component/FlowBiteSvelte/FlowBiteSvelteTable.svelte';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes
export default {
  title: 'Example/FlowBiteSvelteTable',
  component: FlowBiteSvelteTable,
  argTypes: {
    tableWidth: {
      control: { type: 'select' },
      options: ['w-10', 'w-1/5', 'w-full']
    },
    tableHeight: {
      control: { type: 'select' },
      options: ['h-10', 'h-1/5','h-full']
    },
    styleStr: {
      control: { type: 'object' },
    },
    headers: {
      control: { type: 'object' }
    },
    bodys: {
      control: { type: 'object' }
    }
  }
};

// More on component templates: https://storybook.js.org/docs/svelte/writing-stories/introduction#using-args
const Template = (args) => ({
  Component: FlowBiteSvelteTable,
  props: args,
  on: {
    click: args.onClick,
  },
});

// More on args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Primary = Template.bind({});
Primary.args = {
  tableWidth: 'w-full',
  tableHeight: 'h-full',
  styleStr: 'padding: 3px;',
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
  ]
};