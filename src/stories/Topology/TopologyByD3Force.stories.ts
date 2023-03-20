import TopologyByD3Force from '../../component/Topology/TopologyByD3Force.svelte';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// More on argTypes: https://storybook.js.org/docs/svelte/api/argtypes
export default {
  title: 'Example/Topology/TopologyByD3Force',
  component: TopologyByD3Force,
  argTypes: {
    alpha: {
      control: { type: 'select' },
      options: [0, 0.5, 1],
      description: '',
      table: {
        type: { summary: 'number' },
      },
    }
  }
};

// More on component templates: https://storybook.js.org/docs/svelte/writing-stories/introduction#using-args
const Template = (args) => ({
  Component: TopologyByD3Force,
  props: args,
  on: {
    click: args.onClick,
  },
});

// More on args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Primary = Template.bind({});
Primary.args = {
  alpha: 0.5
};