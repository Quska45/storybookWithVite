import FlowBiteSvelteTab from '../../component/FlowBiteSvelte/FlowBiteSvelteTab.svelte';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes
export default {
  title: 'Example/FlowBiteSvelteTab',
  component: FlowBiteSvelteTab,
  argTypes: {
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
  Component: FlowBiteSvelteTab,
  props: args,
  on: {
    click: args.onClick,
  },
});

// More on args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Primary = Template.bind({});
Primary.args = {
  tabs: [
    {
      isOpen: true,
      title: 'Memory'
    }
  ],
  tabItemStyleStr: ''
};