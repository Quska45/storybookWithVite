import FlowBiteSvelteButton from '../../component/FlowBiteSvelte/FlowBiteSvelteButton.svelte';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes
export default {
  title: 'Example/FlowBite/FlowBiteSvelteButton',
  component: FlowBiteSvelteButton,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['red', 'yellow', 'green', 'purple', 'pink', 'blue', 'light', 'dark']
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl']
    },
    width: {
      control: { type: 'select' },
      options: ['w-1', 'w-2', 'w-3', 'w-4', 'w-5', 'w-6', 'w-7', 'w-8', 'w-9', 'w-10', 'w-11', 'w-12', 'w-13', 'w-14', 'w-15']
    },
    height: {
      control: { type: 'select' },
      options: ['h-1', 'h-2', 'h-3', 'h-4', 'h-5', 'h-6', 'h-7', 'h-8', 'h-9', 'h-10', 'h-11', 'h-12', 'h-13', 'h-14', 'h-15']
    },
    styleStr: {
      control: { type: 'object' }
    },
    svgClass: {
      control: { type: 'select' },
      options: ['w-3']
    },
    svg_d: {
      control: { type: 'select' },
      options: [
        '',
        'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z',
        'M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3',
        'M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18'
      ]
    },
    isSelected: {
      control: { type: 'select' },
      options: [true, false]
    }
  }
};

// More on component templates: https://storybook.js.org/docs/svelte/writing-stories/introduction#using-args
const Template = (args) => ({
  Component: FlowBiteSvelteButton,
  props: args,
  on: {
    click: args.onClick,
  },
});

// More on args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Primary = Template.bind({});
Primary.args = {
  color: 'green',
  size: 'xs',
  width: 'w-15',
  height: 'h-10',
  styleStr: '',
  svgClass: 'w-3',
  svg_d: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z',
  isSelected: false
};